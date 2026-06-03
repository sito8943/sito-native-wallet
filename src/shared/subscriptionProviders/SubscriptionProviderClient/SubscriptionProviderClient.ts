import { textIncludes, type QueryParam, type QueryResult } from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"

import { INITIAL_SUBSCRIPTION_PROVIDERS } from "../demoData"
import {
  type AddSubscriptionProviderDto,
  type FilterSubscriptionProviderDto,
} from "../dtos"
import { type SubscriptionProvider } from "../SubscriptionProvider"

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

  public update = (id: string, input: AddSubscriptionProviderDto): void => {
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
}
