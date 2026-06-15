// Context passed to every push (the signed-in user owns the rows).
export type SyncContext = { userId: number }

// What the server last saw for a local row: its backend id + a snapshot of the
// synced fields, so the push can detect what actually changed.
export type SyncBaseline = Map<
  number,
  { remoteId: number; fields: Record<string, unknown> }
>

// Per-entity sync adapter. Each feature provides one (keeping its endpoint,
// payload shape, FK resolution and field set local to the feature); the engine
// drives them generically and the orchestrator sequences them in dependency
// order.
export type EntitySync<T extends { id: number; remoteId?: number }, P> = {
  // Stable key used to store this entity's baseline across runs.
  label: string
  // Pull remote rows and merge them into the local store (insert-only). Owns
  // its own client + any cross-entity resolution (e.g. currency lookup).
  pull: () => Promise<void>
  // The local rows that participate in sync (e.g. excluding system categories).
  list: () => T[]
  // Record the backend id assigned to a locally-created row after its POST.
  attachRemoteId: (localId: number, remoteId: number) => void
  // Build the push payload, or null to SKIP this row (blank required field, or
  // an unresolved FK whose target isn't synced yet — retried on the next pass).
  toPayload: (item: T, ctx: SyncContext) => P | null
  // Snapshot of the synced fields, compared shallowly to detect changes.
  fields: (item: T) => Record<string, unknown>
  create: (payload: P) => Promise<number>
  update: (remoteId: number, payload: P) => Promise<number>
  remove: (remoteIds: number[]) => Promise<number>
}

// An EntitySync with its T/P generics erased behind closures, so a list of
// differently-typed adapters is homogeneous and the orchestrator can iterate
// it. Produced by `bindSync`.
export type BoundSync = {
  label: string
  pull: () => Promise<void>
  buildBaseline: () => SyncBaseline
  flush: (baseline: SyncBaseline, ctx: SyncContext) => Promise<void>
}
