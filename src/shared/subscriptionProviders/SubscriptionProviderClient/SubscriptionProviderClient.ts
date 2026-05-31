import { createId, StorageClient } from "#shared/storage"

import { INITIAL_SUBSCRIPTION_PROVIDERS } from "../demoData"
import { type AddSubscriptionProviderDto } from "../dtos"
import { type SubscriptionProvider } from "../SubscriptionProvider"

import {
  SUBSCRIPTION_PROVIDERS_ERROR_MESSAGE,
  SUBSCRIPTION_PROVIDERS_STORAGE_KEY,
} from "./constants"
import { parseStoredSubscriptionProviders } from "./utils"

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
}
