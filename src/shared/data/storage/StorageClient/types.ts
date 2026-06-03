// ISO-string timestamps managed by StorageClient (JSON-safe, unlike Date).
// Optional on entity types so they can also be embedded as snapshots and seeded
// without timestamps; StorageClient always stamps them for stored records.
export type Timestamps = {
  createdAt: string
  updatedAt: string
}

export type ClientState<T> = {
  items: T[]
  isLoading: boolean
  error: Error | null
}

export type StorageClientConfig<T> = {
  storageKey: string
  errorMessage: string
  initialValue: T[]
  parse: (value: unknown) => T[]
}

// Minimal surface a React store needs (useSyncExternalStore).
export type ReactiveStore<T> = {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => ClientState<T>
}
