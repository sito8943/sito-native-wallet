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
