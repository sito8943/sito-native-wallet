import { type Dispatch, type SetStateAction } from "react"

// Snapshot a RecordStore hands to useSyncExternalStore. Single record (not a
// list, unlike ClientState<T>) — the singleton shape for things like the user
// profile, where there is exactly one row.
export type RecordState<T> = {
  data: T
  isLoading: boolean
  error: Error | null
}

export type RecordStoreConfig<T> = {
  storageKey: string
  errorMessage: string
  initialValue: T
  parse: (value: unknown) => T
}

// Minimal reactive surface useRecordStore subscribes to.
export type ReactiveRecord<T> = {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => RecordState<T>
  setData: Dispatch<SetStateAction<T>>
}
