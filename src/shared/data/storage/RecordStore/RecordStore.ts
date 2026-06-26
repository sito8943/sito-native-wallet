import AsyncStorage from "@react-native-async-storage/async-storage"
import { type SetStateAction } from "react"

import {
  type ReactiveRecord,
  type RecordState,
  type RecordStoreConfig,
} from "./types"
import { toError } from "./utils"

// Reactive AsyncStorage-backed store for a SINGLE record (the singleton
// counterpart to StorageClient's list). One in-memory copy is the source of
// truth; subscribers re-render on change; disk persists in the background. The
// same value is shared across every consumer (unlike the per-component
// useStoredState), so an edit in one screen is visible everywhere at once.
//
// Writes never clobber data that hasn't loaded yet: hydration starts in the
// constructor, and a setData made before disk finishes loading marks the value
// dirty so the load doesn't overwrite it with the stored copy.
export default class RecordStore<T> implements ReactiveRecord<T> {
  private state: RecordState<T>
  private readonly listeners = new Set<() => void>()
  private readonly config: RecordStoreConfig<T>
  private hydration: Promise<void> | null = null
  // True once disk has loaded; until then a write can't be persisted safely.
  private hydrated = false
  // True if setData ran before hydration, so the load keeps the live value
  // instead of clobbering it with the (stale) stored copy.
  private dirtyBeforeHydration = false

  constructor(config: RecordStoreConfig<T>) {
    this.config = config
    this.state = { data: config.initialValue, isLoading: true, error: null }
    // Start loading immediately so the read race window closes before the user
    // can interact.
    void this.hydrate()
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    void this.hydrate()

    return () => {
      this.listeners.delete(listener)
    }
  }

  public getSnapshot = (): RecordState<T> => this.state

  // Loads from disk once. A write made before the load wins (the stored copy is
  // ignored) so an early edit isn't lost; otherwise the stored value seeds the
  // live copy.
  public hydrate = async (): Promise<void> => {
    if (this.hydration !== null) {
      return this.hydration
    }

    this.hydration = (async () => {
      try {
        const cached = await AsyncStorage.getItem(this.config.storageKey)

        if (!this.dirtyBeforeHydration) {
          const base =
            cached !== null
              ? this.config.parse(JSON.parse(cached))
              : this.config.initialValue
          this.setState({ data: base, isLoading: false })
        } else {
          this.setState({ isLoading: false })
        }

        this.hydrated = true

        // Persist the value withheld from disk while it was still loading.
        if (this.dirtyBeforeHydration) {
          void this.persist()
        }
      } catch (error) {
        // Unblock writes even on failure, so the app stays usable.
        this.hydrated = true
        this.setState({
          isLoading: false,
          error: toError(error, this.config.errorMessage),
        })
      }
    })()

    return this.hydration
  }

  // Same contract as useState's setter: a value or an updater over the current
  // value. Applied to the in-memory copy at once; persisted once hydrated.
  public setData = (next: SetStateAction<T>): void => {
    const data =
      typeof next === "function"
        ? (next as (prev: T) => T)(this.state.data)
        : next
    this.setState({ data })

    if (!this.hydrated) {
      this.dirtyBeforeHydration = true
      return
    }

    void this.persist()
  }

  // Factory reset back to the seed and persist. Called on sign-in/sign-out so a
  // new user (or guest) doesn't inherit the previous user's record.
  public clear = (): void => {
    this.setData(this.config.initialValue)
  }

  private persist = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        this.config.storageKey,
        JSON.stringify(this.state.data),
      )
    } catch (error) {
      this.setState({ error: toError(error, this.config.errorMessage) })
    }
  }

  private setState(partial: Partial<RecordState<T>>): void {
    this.state = { ...this.state, ...partial }
    this.notify()
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      listener()
    })
  }
}
