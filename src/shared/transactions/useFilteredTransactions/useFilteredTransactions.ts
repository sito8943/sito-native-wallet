import { useMemo } from "react"

import { useAccounts } from "#shared/accounts"
import { useStoredState } from "#shared/storage"

import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"
import { useTransactions } from "../useTransactions"

import {
  DEFAULT_TRANSACTIONS_PREFERENCES,
  TRANSACTIONS_PREFERENCES_STORAGE_KEY,
} from "./constants"
import { type UseFilteredTransactionsState } from "./types"
import { applyTransactionsPreferences, parseStoredPreferences } from "./utils"

export default function useFilteredTransactions(): UseFilteredTransactionsState {
  const { data: accounts } = useAccounts()
  const { data: transactions, isLoading: isLoadingTransactions } =
    useTransactions()

  const {
    data: preferences,
    error,
    isLoading: isLoadingPreferences,
    setData: setPreferences,
  } = useStoredState<TransactionsPreferences>({
    errorMessage: "Unable to persist transaction preferences.",
    initialValue: DEFAULT_TRANSACTIONS_PREFERENCES,
    parseStoredValue: parseStoredPreferences,
    storageKey: TRANSACTIONS_PREFERENCES_STORAGE_KEY,
  })

  const isLoading = isLoadingPreferences || isLoadingTransactions

  const data = useMemo(() => {
    if (isLoading) {
      return null
    }

    return applyTransactionsPreferences(transactions, preferences)
  }, [isLoading, transactions, preferences])

  return {
    accounts: accounts ?? [],
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
