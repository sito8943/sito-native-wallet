import {
  type BoundSync,
  type EntitySync,
  type SingletonSync,
  type SyncBaseline,
  type SyncContext,
} from "./types"

// The fixed baseline key for a singleton record: it has no per-row local id, so
// its one entry lives under a stable key in the same SyncBaseline map the
// collection engine + syncSession already use — no separate storage shape.
const SINGLETON_KEY = 0

// Shallow-compare two field snapshots (same fixed keys per entity).
const fieldsChanged = (
  base: Record<string, unknown>,
  next: Record<string, unknown>,
): boolean => {
  for (const key of Object.keys(next)) {
    if (base[key] !== next[key]) {
      return true
    }
  }
  return false
}

// Snapshot the currently-synced rows (those with a remoteId) as the baseline the
// push diffs against. Built after a pull, kept in memory by the orchestrator.
export const buildBaseline = <T extends { id: number; remoteId?: number }, P>(
  sync: EntitySync<T, P>,
): SyncBaseline => {
  const baseline: SyncBaseline = new Map()
  for (const item of sync.list()) {
    if (item.remoteId !== undefined) {
      baseline.set(item.id, {
        remoteId: item.remoteId,
        fields: sync.fields(item),
      })
    }
  }
  return baseline
}

// Reconcile local rows to the backend. Mutates `baseline` in place so the next
// run sees the new server state. Each op is isolated: one failure leaves that
// row's baseline untouched so the next change retries it, without blocking the
// others.
export const flush = async <T extends { id: number; remoteId?: number }, P>(
  sync: EntitySync<T, P>,
  baseline: SyncBaseline,
  ctx: SyncContext,
): Promise<void> => {
  const current = sync.list()
  const currentIds = new Set(current.map((item) => item.id))

  for (const item of current) {
    const payload = sync.toPayload(item, ctx)
    // Blank required field or an unresolved FK — wait for the next pass.
    if (payload === null) {
      continue
    }

    const base = baseline.get(item.id)

    if (item.remoteId === undefined) {
      try {
        const remoteId = await sync.create(payload)
        sync.attachRemoteId(item.id, remoteId)
        baseline.set(item.id, { remoteId, fields: sync.fields(item) })
      } catch {
        // Leave it unsynced; the next change retries the create.
      }
    } else if (
      base === undefined ||
      fieldsChanged(base.fields, sync.fields(item))
    ) {
      try {
        await sync.update(item.remoteId, payload)
        baseline.set(item.id, {
          remoteId: item.remoteId,
          fields: sync.fields(item),
        })
      } catch {
        // Keep the stale baseline so the next change retries the update.
      }
    }
  }

  // Deletes: rows the server knew about (in baseline) that are gone locally.
  const removedRemoteIds: number[] = []
  for (const [localId, base] of baseline) {
    if (!currentIds.has(localId)) {
      removedRemoteIds.push(base.remoteId)
    }
  }

  if (removedRemoteIds.length > 0) {
    try {
      await sync.remove(removedRemoteIds)
      for (const [localId] of baseline) {
        if (!currentIds.has(localId)) {
          baseline.delete(localId)
        }
      }
    } catch {
      // Keep them in the baseline so the next change retries the delete.
    }
  }
}

// Adapt a singleton record sync to the same BoundSync interface the collection
// adapters expose, so the orchestrator drives both with one loop and stores the
// baseline by label in syncSession unchanged. Only ever PATCHes: the record
// exists server-side (no create), and is never deleted here.
export const bindSingletonSync = <P>(sync: SingletonSync<P>): BoundSync => ({
  label: sync.label,
  pull: sync.pull,
  buildBaseline: () => {
    const baseline: SyncBaseline = new Map()
    const remoteId = sync.remoteId()
    // Only after a successful pull do we know the PATCH target + server state.
    if (remoteId !== null) {
      baseline.set(SINGLETON_KEY, { remoteId, fields: sync.fields() })
    }
    return baseline
  },
  flush: async (baseline: SyncBaseline, ctx: SyncContext) => {
    const remoteId = sync.remoteId()
    // Never pulled (offline at sign-in): no target, so nothing to push yet.
    if (remoteId === null) {
      return
    }

    const payload = sync.toPayload(ctx)
    // Blank required field — wait for a real value.
    if (payload === null) {
      return
    }

    const base = baseline.get(SINGLETON_KEY)
    if (base !== undefined && !fieldsChanged(base.fields, sync.fields())) {
      return
    }

    try {
      await sync.update(remoteId, payload)
      baseline.set(SINGLETON_KEY, { remoteId, fields: sync.fields() })
    } catch {
      // Keep the stale baseline so the next change retries the update.
    }
  },
})

// Erase an adapter's T/P generics behind closures so a heterogeneous list of
// adapters is uniformly typed (`BoundSync[]`) — each bound op stays correct
// because it closes over its own concrete types.
export const bindSync = <T extends { id: number; remoteId?: number }, P>(
  sync: EntitySync<T, P>,
): BoundSync => ({
  label: sync.label,
  pull: sync.pull,
  buildBaseline: () => buildBaseline(sync),
  flush: (baseline: SyncBaseline, ctx: SyncContext) =>
    flush(sync, baseline, ctx),
})
