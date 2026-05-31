import { useCallback } from "react"

import { createId, useStoredState } from "#shared/storage"

import { INITIAL_CURRENCIES } from "../demoData"
import { type AddCurrencyDto } from "../dtos"

import {
  CURRENCIES_ERROR_MESSAGE,
  CURRENCIES_STORAGE_KEY,
} from "./constants"
import { type UseCurrenciesState } from "./types"
import { parseStoredCurrencies } from "./utils"

export default function useCurrencies(): UseCurrenciesState {
  const { data, error, isLoading, setData } = useStoredState({
    errorMessage: CURRENCIES_ERROR_MESSAGE,
    initialValue: INITIAL_CURRENCIES,
    parseStoredValue: parseStoredCurrencies,
    storageKey: CURRENCIES_STORAGE_KEY,
  })

  const addCurrency = useCallback(
    (input: AddCurrencyDto) => {
      setData((current) => [...current, { id: createId(), ...input }])
    },
    [setData],
  )

  const updateCurrency = useCallback(
    (id: string, input: AddCurrencyDto) => {
      setData((current) =>
        current.map((currency) =>
          currency.id === id ? { ...currency, ...input } : currency,
        ),
      )
    },
    [setData],
  )

  const removeCurrency = useCallback(
    (id: string) => {
      setData((current) => current.filter((currency) => currency.id !== id))
    },
    [setData],
  )

  return {
    data,
    error,
    isLoading,
    addCurrency,
    updateCurrency,
    removeCurrency,
  }
}
