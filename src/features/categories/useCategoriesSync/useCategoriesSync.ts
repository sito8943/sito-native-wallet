import { useEffect, useRef } from "react"

import { USE_MOCK_AUTH, useSession } from "#features/auth"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import {
  createCategory,
  deleteCategories,
  fetchCategories,
  updateCategory,
  type CategoryPayload,
} from "../categoriesClient"
import { type TransactionCategory } from "../TransactionCategory"

// Wait this long after the last local change before pushing, so editing a
// category's fields doesn't fire a request per keystroke.
const PUSH_DEBOUNCE_MS = 800

// The synced fields of a category, captured after each successful pull/push so
// the diff can tell what actually changed since the server last saw it.
type Baseline = {
  remoteId: number
  name: string
  description: string
  color: string
  type: number
}

const nonSystemCategories = (
  items: TransactionCategory[],
): TransactionCategory[] => items.filter((category) => category.system !== true)

const buildBaseline = (
  items: TransactionCategory[],
): Map<number, Baseline> => {
  const baseline = new Map<number, Baseline>()
  for (const category of nonSystemCategories(items)) {
    if (category.remoteId !== undefined) {
      baseline.set(category.id, toBaseline(category, category.remoteId))
    }
  }
  return baseline
}

const toBaseline = (
  category: TransactionCategory,
  remoteId: number,
): Baseline => ({
  remoteId,
  name: category.name,
  description: category.description ?? "",
  color: category.color,
  type: category.type,
})

const fieldsChanged = (base: Baseline, category: TransactionCategory): boolean =>
  base.name !== category.name ||
  base.description !== (category.description ?? "") ||
  base.color !== category.color ||
  base.type !== category.type

const toPayload = (
  category: TransactionCategory,
  userId: number,
): CategoryPayload => ({
  name: category.name.trim(),
  description: category.description,
  color: category.color,
  type: category.type,
  userId,
})

// Reconcile local categories to the backend. Mutates `baseline` in place so the
// next run sees the new server state. Each op is isolated: one failure leaves
// that row's baseline untouched so the next change retries it, without blocking
// the others.
const flush = async (
  client: ReturnType<typeof useManager>["Categories"],
  baseline: Map<number, Baseline>,
  userId: number,
): Promise<void> => {
  const current = nonSystemCategories(client.getAll())
  const currentIds = new Set(current.map((category) => category.id))

  for (const category of current) {
    if (category.name.trim() === "") {
      continue
    }

    const base = baseline.get(category.id)

    if (category.remoteId === undefined) {
      try {
        const remoteId = await createCategory(toPayload(category, userId))
        client.attachRemoteId(category.id, remoteId)
        baseline.set(category.id, toBaseline(category, remoteId))
      } catch {
        // Leave it unsynced; the next change retries the create.
      }
    } else if (base === undefined || fieldsChanged(base, category)) {
      try {
        await updateCategory(category.remoteId, toPayload(category, userId))
        baseline.set(category.id, toBaseline(category, category.remoteId))
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
      await deleteCategories(removedRemoteIds)
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

// Two-way category sync against the real backend (no-op as a guest or with the
// mock client). Pulls the user's categories once per sign-in (insert-only — it
// never clobbers or deletes local rows), then pushes local create/update/delete
// edits back with a debounce. AsyncStorage stays the source of truth; failures
// are swallowed so the local list survives offline and the next edit retries.
export default function useCategoriesSync(): void {
  const { isAuthenticated, account } = useSession()
  const client = useManager().Categories
  // Re-render this hook whenever the local store changes, so the push effect
  // re-evaluates the diff after every add/edit/remove.
  const snapshot = useClientStore(client)
  const userId = account?.id ?? null

  const baselineRef = useRef<Map<number, Baseline> | null>(null)
  const hydratedRef = useRef(false)

  // Pull once per authenticated session.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated) {
      return
    }

    let active = true

    void (async () => {
      try {
        const remote = await fetchCategories()
        if (!active) {
          return
        }
        client.mergeRemote(remote)
        baselineRef.current = buildBaseline(client.getAll())
        hydratedRef.current = true
      } catch {
        // Offline or unauthorized: keep the local list untouched.
      }
    })()

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Push: debounce local edits back to the backend.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated || !hydratedRef.current) {
      return
    }

    const baseline = baselineRef.current
    if (baseline === null || userId === null) {
      return
    }

    const handle = setTimeout(() => {
      void flush(client, baseline, userId)
    }, PUSH_DEBOUNCE_MS)

    return () => {
      clearTimeout(handle)
    }
    // `snapshot` is the change trigger; client/baseline are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot, isAuthenticated, userId])
}
