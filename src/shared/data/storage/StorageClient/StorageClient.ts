import AsyncStorage from "@react-native-async-storage/async-storage"

// Deep path on purpose: importing the #shared/data barrel here would close the
// Manager import cycle (barrel → useManager → Manager → clients → this).
import {
  applyQuery,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"

import { SEED_TIMESTAMP } from "./constants"
import {
  type ClientState,
  type ReactiveStore,
  type StorageClientConfig,
  type Timestamps,
} from "./types"
import { nowIso, toError } from "./utils"

// Reactive AsyncStorage-backed CRUD store. In-memory cache is the single
// source of truth; subscribers re-render on change; disk persists in the
// background. createdAt/updatedAt are owned here: stamped on insert, bumped on
// patch — subclasses never set them. Subclasses add entity-specific methods on
// top of insert/patch.
export default abstract class StorageClient<
  T extends { id: string } & Partial<Timestamps>,
> implements ReactiveStore<T> {
  private state: ClientState<T>
  private readonly listeners = new Set<() => void>()
  private readonly config: StorageClientConfig<T>
  private hydration: Promise<void> | null = null

  constructor(config: StorageClientConfig<T>) {
    this.config = config
    this.state = {
      items: config.initialValue.map((seed) => this.ensureTimestamps(seed)),
      isLoading: true,
      error: null,
    }
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

  // Selects one record by id. Locally this is an in-memory lookup; a future
  // ApiClient would override it to hit GET /<resource>/:id. Keeping selection
  // on the client (not in the hook) means the swap won't touch hooks or views.
  public getById = (id: string): T | undefined =>
    this.state.items.find((item) => item.id === id)

  // List with filter (predicate) + sort + pagination, returning the backend's
  // QueryResult shape. Locally an in-memory pass via applyQuery; an ApiClient
  // overrides it to send the query/filters as a request. The predicate is the
  // entity-specific filter translation, built by the subclass or hook.
  public list = (
    params: QueryParam<T> = {},
    predicate?: (item: T) => boolean,
  ): QueryResult<T> => applyQuery(this.state.items, params, predicate)

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
            // Backfill timestamps for data persisted before they existed.
            items: this.config
              .parse(JSON.parse(cached))
              .map((item) => this.ensureTimestamps(item)),
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
    this.commit([...this.state.items, this.stampNew(item)])
  }

  // Adds several items in a single commit (one persist + one notify) — used by
  // bulk flows like prefab pickers.
  protected insertMany(items: T[]): void {
    if (items.length === 0) {
      return
    }

    this.commit([
      ...this.state.items,
      ...items.map((item) => this.stampNew(item)),
    ])
  }

  protected patch(id: string, partial: Partial<T>): void {
    const updatedAt = nowIso()
    this.commit(
      this.state.items.map((item) =>
        item.id === id ? { ...item, ...partial, updatedAt } : item,
      ),
    )
  }

  // Fresh records get both timestamps set to now.
  private stampNew(item: T): T {
    const now = nowIso()
    return { ...item, createdAt: now, updatedAt: now }
  }

  // Seeds and data persisted before timestamps existed get backfilled.
  private ensureTimestamps(item: T): T {
    const createdAt = item.createdAt ?? SEED_TIMESTAMP
    return { ...item, createdAt, updatedAt: item.updatedAt ?? createdAt }
  }

  // Deletion split out so subclasses can override the public `remove` to add
  // side effects (e.g. balance updates) while still reusing the commit path.
  protected delete(id: string): void {
    this.commit(this.state.items.filter((item) => item.id !== id))
  }

  public remove = (id: string): void => {
    this.delete(id)
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
