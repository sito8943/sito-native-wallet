import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCurrencyDto } from "../dtos"

import { type UseCurrenciesOptions, type UseCurrenciesState } from "./types"

export default function useCurrencies(
  options: UseCurrenciesOptions = {},
): UseCurrenciesState {
  const { filters, query } = options
  const client = useManager().Currencies
  const { error, isLoading } = useClientStore(client)

  // The client owns filter matching; pageSize 0 = full list by default.
  const result = client.list({ pageSize: 0, ...query }, filters)

  return {
    data: result.items,
    result,
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
