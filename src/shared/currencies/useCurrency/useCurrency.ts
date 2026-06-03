import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCurrencyDto } from "../dtos"

import { type UseCurrencyState } from "./types"

// Selects one currency by id through the client's getById and binds its
// mutations. The view doesn't list all currencies and filter in render.
export default function useCurrency(id: string): UseCurrencyState {
  const client = useManager().Currencies
  const { error, isLoading } = useClientStore(client)
  const currency = client.getById(id) ?? null

  return {
    data: currency,
    error,
    isLoading,
    update: (input: AddCurrencyDto) => {
      client.update(id, input)
    },
    remove: () => {
      client.remove(id)
    },
  }
}
