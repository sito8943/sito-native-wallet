import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCurrencyDto } from "../dtos"

import { type UseCurrenciesState } from "./types"

export default function useCurrencies(): UseCurrenciesState {
  const client = useManager().Currencies
  const { items, error, isLoading } = useClientStore(client)

  return {
    data: items,
    error,
    isLoading,
    addCurrency: (input: AddCurrencyDto) => {
      client.add(input)
    },
    addCurrencies: (inputs: AddCurrencyDto[]) => {
      client.addMany(inputs)
    },
    updateCurrency: (id: string, input: AddCurrencyDto) => {
      client.update(id, input)
    },
    removeCurrency: (id: string) => {
      client.remove(id)
    },
  }
}
