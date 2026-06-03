import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddSubscriptionProviderDto } from "../dtos"

import {
  type UseSubscriptionProvidersOptions,
  type UseSubscriptionProvidersState,
} from "./types"

export default function useSubscriptionProviders(
  options: UseSubscriptionProvidersOptions = {},
): UseSubscriptionProvidersState {
  const { filters, query } = options
  const client = useManager().SubscriptionProviders
  const { error, isLoading } = useClientStore(client)

  // The client owns filter matching; pageSize 0 = full list by default.
  const result = client.list({ pageSize: 0, ...query }, filters)

  return {
    data: result.items,
    result,
    error,
    isLoading,
    addSubscriptionProvider: (input: AddSubscriptionProviderDto) => {
      client.add(input)
    },
    updateSubscriptionProvider: (
      id: string,
      input: AddSubscriptionProviderDto,
    ) => {
      client.update(id, input)
    },
    removeSubscriptionProvider: (id: string) => {
      client.remove(id)
    },
  }
}
