import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddSubscriptionProviderDto } from "../dtos"

import { type UseSubscriptionProvidersState } from "./types"

export default function useSubscriptionProviders(): UseSubscriptionProvidersState {
  const client = useManager().SubscriptionProviders
  const { items, error, isLoading } = useClientStore(client)

  return {
    data: items,
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
