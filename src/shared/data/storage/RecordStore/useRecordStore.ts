import { useSyncExternalStore } from "react"

import { type ReactiveRecord, type RecordState } from "./types"

// Subscribes a component to a RecordStore and re-renders on change.
export default function useRecordStore<T>(
  store: ReactiveRecord<T>,
): RecordState<T> {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}
