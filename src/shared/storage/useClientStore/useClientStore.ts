import { useSyncExternalStore } from "react"

import { type ClientState, type ReactiveStore } from "../StorageClient"

// Subscribes a component to a reactive store and re-renders on change.
export default function useClientStore<T>(
  store: ReactiveStore<T>,
): ClientState<T> {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}
