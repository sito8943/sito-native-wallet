import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  type ClientState,
  type ReactiveStore,
  type StorageClientConfig,
} from "./types"

const toError = (error: unknown, fallback: string): Error =>
  error instanceof Error ? error : new Error(fallback)

// Reactive AsyncStorage-backed CRUD store. In-memory cache is the single
// source of truth; subscribers re-render on change; disk persists in the
// background. Subclasses add entity-specific methods on top of insert/patch.
export default abstract class StorageClient<
  T extends { id: string },
> implements ReactiveStore<T> {
  private state: ClientState<T>
  private readonly listeners = new Set<() => void>()
  private readonly config: StorageClientConfig<T>
  private hydration: Promise<void> | null = null

  constructor(config: StorageClientConfig<T>) {
    this.config = config
    this.state = { items: config.initialValue, isLoading: true, error: null }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    void this.hydrate()

    return () => {
      this.listeners.delete(listener)
    }
  }

  public getSnapshot = (): ClientState<T> => this.state

  public getAll = (): T[] => this.state.items

  // Loads from disk once. Seeds initial value on first launch.
  public hydrate = async (): Promise<void> => {
    if (this.hydration !== null) {
      return this.hydration
    }

    this.hydration = (async () => {
      try {
        const cached = await AsyncStorage.getItem(this.config.storageKey)

        if (cached !== null) {
          this.setState({
            items: this.config.parse(JSON.parse(cached)),
            isLoading: false,
          })
          return
        }

        this.setState({ isLoading: false })
        void this.persist()
      } catch (error) {
        this.setState({
          isLoading: false,
          error: toError(error, this.config.errorMessage),
        })
      }
    })()

    return this.hydration
  }

  protected insert(item: T): void {
    this.commit([...this.state.items, item])
  }

  protected patch(id: string, partial: Partial<T>): void {
    this.commit(
      this.state.items.map((item) =>
        item.id === id ? { ...item, ...partial } : item,
      ),
    )
  }

  public remove = (id: string): void => {
    this.commit(this.state.items.filter((item) => item.id !== id))
  }

  private commit(items: T[]): void {
    this.setState({ items })
    void this.persist()
  }

  private persist = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        this.config.storageKey,
        JSON.stringify(this.state.items),
      )
    } catch (error) {
      this.setState({ error: toError(error, this.config.errorMessage) })
    }
  }

  private setState(partial: Partial<ClientState<T>>): void {
    this.state = { ...this.state, ...partial }
    this.notify()
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      listener()
    })
  }
}
