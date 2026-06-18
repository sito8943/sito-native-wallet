import {
  textIncludes,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"
import { createId, StorageClient } from "#shared/data/storage"

import { INITIAL_SUBSCRIPTION_PROVIDERS } from "../demoData"
import {
  type AddSubscriptionProviderDto,
  type FilterSubscriptionProviderDto,
} from "../dtos"
import { type SubscriptionProvider } from "../SubscriptionProvider"
import { type RemoteSubscriptionProvider } from "../subscriptionProvidersClient"

import {
  SUBSCRIPTION_PROVIDERS_ERROR_MESSAGE,
  SUBSCRIPTION_PROVIDERS_STORAGE_KEY,
} from "./constants"
import { parseStoredSubscriptionProviders } from "./utils"

const matchesProviderFilter =
  (filters: FilterSubscriptionProviderDto) =>
  (provider: SubscriptionProvider): boolean =>
    textIncludes(provider.name, filters.name)

export default class SubscriptionProviderClient extends StorageClient<SubscriptionProvider> {
  constructor() {
    super({
      storageKey: SUBSCRIPTION_PROVIDERS_STORAGE_KEY,
      errorMessage: SUBSCRIPTION_PROVIDERS_ERROR_MESSAGE,
      initialValue: INITIAL_SUBSCRIPTION_PROVIDERS,
      parse: parseStoredSubscriptionProviders,
    })
  }

  public add = (input: AddSubscriptionProviderDto): void => {
    this.insert({ id: createId(), ...input })
  }

  public addMany = (inputs: AddSubscriptionProviderDto[]): void => {
    this.insertMany(inputs.map((input) => ({ id: createId(), ...input })))
  }

  public update = (id: number, input: AddSubscriptionProviderDto): void => {
    this.patch(id, input)
  }

  public list = (
    params: QueryParam<SubscriptionProvider> = {},
    filters?: FilterSubscriptionProviderDto,
  ): QueryResult<SubscriptionProvider> =>
    this.runQuery(
      params,
      filters === undefined ? undefined : matchesProviderFilter(filters),
    )

  // --- Backend sync bookkeeping ---------------------------------------------
  // `mutate` (not insert/patch) on purpose: records server state, not a user
  // edit, so it must not bump `updatedAt` or look like a local change.

  // Pull (insert-only): add backend providers we don't already track by
  // remoteId.
  public mergeRemote = (remote: RemoteSubscriptionProvider[]): void => {
    this.mutate((items) => {
      const known = new Set(
        items
          .map((provider) => provider.remoteId)
          .filter((id): id is number => id !== undefined),
      )

      const additions: SubscriptionProvider[] = []
      for (const row of remote) {
        if (known.has(row.id)) {
          continue
        }
        additions.push({
          id: createId(),
          remoteId: row.id,
          name: row.name,
          description: row.description ?? undefined,
          website: row.website ?? undefined,
          photo: row.photo ?? undefined,
        })
      }

      return additions.length === 0 ? items : [...items, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created provider after POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((provider) =>
        provider.id === localId ? { ...provider, remoteId } : provider,
      ),
    )
  }
}
