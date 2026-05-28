import { useMemo } from "react"

import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { useStoredState } from "#shared/storage"

import { INITIAL_TRANSACTIONS } from "../demoData"
import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"

import {
  DEFAULT_TRANSACTIONS_PREFERENCES,
  TRANSACTIONS_PREFERENCES_STORAGE_KEY,
} from "./constants"
import { type UseFilteredTransactionsState } from "./types"
import {
  applyTransactionsPreferences,
  parseStoredPreferences,
} from "./utils"

export default function useFilteredTransactions(): UseFilteredTransactionsState {
  const {
    error,
    isLoading,
    setValue: setPreferences,
    value: preferences,
  } = useStoredState<TransactionsPreferences>({
    errorMessage: "Unable to persist transaction preferences.",
    initialValue: DEFAULT_TRANSACTIONS_PREFERENCES,
    parseStoredValue: parseStoredPreferences,
    storageKey: TRANSACTIONS_PREFERENCES_STORAGE_KEY,
  })

  const data = useMemo(() => {
    if (isLoading) {
      return null
    }

    return applyTransactionsPreferences(INITIAL_TRANSACTIONS, preferences)
  }, [isLoading, preferences])

  return {
    accounts: INITIAL_ACCOUNTS,
    data,
    error,
    isLoading,
    preferences,
    resetPreferences: () => {
      setPreferences(DEFAULT_TRANSACTIONS_PREFERENCES)
    },
    setAccountId: (accountId) => {
      setPreferences((current) => ({ ...current, accountId }))
    },
    setSortOrder: (sortOrder: TransactionSortOrder) => {
      setPreferences((current) => ({ ...current, sortOrder }))
    },
    setTypeFilter: (typeFilter: TransactionTypeFilter) => {
      setPreferences((current) => ({ ...current, typeFilter }))
    },
  }
}
