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

// Mutation expressed as a pure transform over the current item list, so it can
// be applied optimistically to the in-memory cache AND replayed onto the disk
// data once it loads.
type Mutation<T> = (items: T[]) => T[]

// Reactive AsyncStorage-backed CRUD store. In-memory cache is the single
// source of truth; subscribers re-render on change; disk persists in the
// background. createdAt/updatedAt are owned here: stamped on insert, bumped on
// patch — subclasses never set them. Subclasses add entity-specific methods on
// top of insert/patch.
//
// Writes never clobber data that hasn't loaded yet: hydration starts in the
// constructor, and any mutation made before disk finishes loading is queued and
// replayed onto the loaded data (and only then persisted). Otherwise an early
// write would save the seed state over the user's real data — losing it on the
// next launch.
export default abstract class StorageClient<
  T extends { id: number } & Partial<Timestamps>,
> implements ReactiveStore<T> {
  private state: ClientState<T>
  private readonly listeners = new Set<() => void>()
  private readonly config: StorageClientConfig<T>
  private hydration: Promise<void> | null = null
  // True once disk has loaded; until then writes can't be persisted safely.
  private hydrated = false
  // Mutations applied to the seed cache before disk loaded, kept so they can be
  // replayed onto the loaded data instead of being lost (or persisted over it).
  private readonly pending: Array<Mutation<T>> = []

  constructor(config: StorageClientConfig<T>) {
    this.config = config
    this.state = {
      items: config.initialValue.map((seed) => this.ensureTimestamps(seed)),
      isLoading: true,
      error: null,
    }
    // Start loading immediately so the read race window is as small as possible
    // and closes before the user can interact.
    void this.hydrate()
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
  public getById = (id: number): T | undefined =>
    this.state.items.find((item) => item.id === id)

  // Generic list engine: filter (predicate) + sort + pagination, returning the
  // backend's QueryResult shape. Subclasses expose a public `list(params,
  // filters)` that translates their FilterDto into the predicate and calls
  // this — keeping filter translation on the client (the seam an ApiClient
  // overrides to send the query/filters as a real request).
  protected runQuery = (
    params: QueryParam<T> = {},
    predicate?: (item: T) => boolean,
  ): QueryResult<T> => applyQuery(this.state.items, params, predicate)

  // Loads from disk once. Replays any pre-hydration writes onto the loaded data
  // so they survive; seeds the initial value on first launch.
  public hydrate = async (): Promise<void> => {
    if (this.hydration !== null) {
      return this.hydration
    }

    this.hydration = (async () => {
      try {
        const cached = await AsyncStorage.getItem(this.config.storageKey)

        // Disk wins as the base (backfilling timestamps for data persisted
        // before they existed); first launch falls back to the seed.
        const base =
          cached !== null
            ? this.config.parse(JSON.parse(cached))
            : this.config.initialValue

        // Replay writes that happened while disk was still loading, on top of
        // the real data — so an early add/patch/remove isn't lost.
        const replayed = this.pending.reduce(
          (items, mutation) => mutation(items),
          base.map((item) => this.ensureTimestamps(item)),
        )

        const hadPendingWrites = this.pending.length > 0
        this.pending.length = 0
        this.hydrated = true
        this.setState({ items: replayed, isLoading: false })

        // Persist on first launch (to seed) or when we replayed writes that
        // were withheld from disk until now.
        if (cached === null || hadPendingWrites) {
          void this.persist()
        }
      } catch (error) {
        // Unblock writes even on failure, so the app stays usable.
        this.hydrated = true
        this.pending.length = 0
        this.setState({
          isLoading: false,
          error: toError(error, this.config.errorMessage),
        })
      }
    })()

    return this.hydration
  }

  protected insert(item: T): void {
    this.commit((items) => [...items, this.stampNew(item)])
  }

  // Adds several items in a single commit (one persist + one notify) — used by
  // bulk flows like prefab pickers.
  protected insertMany(items: T[]): void {
    if (items.length === 0) {
      return
    }

    this.commit((current) => [
      ...current,
      ...items.map((item) => this.stampNew(item)),
    ])
  }

  protected patch(id: number, partial: Partial<T>): void {
    this.commit((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...partial, updatedAt: nowIso() } : item,
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
  protected delete(id: number): void {
    this.commit((items) => items.filter((item) => item.id !== id))
  }

  public remove = (id: number): void => {
    this.delete(id)
  }

  // Factory reset: drop all stored rows back to the seed and persist. Used on
  // sign-in (the account's server data replaces the device's local data) and on
  // sign-out (return to a clean guest state). Re-seeds infrastructure rows
  // (e.g. system categories) so the app stays functional; the mutation ignores
  // current items, so it overwrites rather than merges.
  public clear = (): void => {
    this.commit(() =>
      this.config.initialValue.map((seed) => this.ensureTimestamps(seed)),
    )
  }

  // Escape hatch for bulk rewrites (e.g. reordering): apply a pure transform
  // over the whole list in one commit (one persist + one notify).
  protected mutate(mutation: Mutation<T>): void {
    this.commit(mutation)
  }

  // Applies a mutation to the in-memory cache immediately (so reads and the UI
  // reflect it at once). If disk hasn't loaded yet, the mutation is queued for
  // replay and NOT persisted — persisting now would save the seed state over
  // the user's real data. Once hydrated, writes persist normally.
  private commit(mutation: Mutation<T>): void {
    this.setState({ items: mutation(this.state.items) })

    if (!this.hydrated) {
      this.pending.push(mutation)
      return
    }

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
