import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddSubscriptionProviderDto } from "../dtos"

import { type UseSubscriptionProviderState } from "./types"

// Selects one subscription provider by id through the client's getById and
// binds its mutations. The view doesn't list all providers and filter.
export default function useSubscriptionProvider(
  id: number,
): UseSubscriptionProviderState {
  const client = useManager().SubscriptionProviders
  const { error, isLoading } = useClientStore(client)
  const provider = client.getById(id) ?? null

  return {
    data: provider,
    error,
    isLoading,
    update: (input: AddSubscriptionProviderDto) => {
      client.update(id, input)
    },
    remove: () => {
      client.remove(id)
    },
  }
}
