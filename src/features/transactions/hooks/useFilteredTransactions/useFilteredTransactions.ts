import { useAccounts } from "#features/accounts"
import { SORT_ORDER } from "#shared/data"
import { useStoredState } from "#shared/data/storage"
import { useI18n } from "#shared/i18n"

import { type FilterTransactionDto } from "../../dtos"
import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../../TransactionsPreferences"
import { useTransactions } from "../useTransactions"

import {
  DEFAULT_TRANSACTIONS_PREFERENCES,
  TRANSACTIONS_PREFERENCES_STORAGE_KEY,
} from "./constants"
import { type UseFilteredTransactionsState } from "./types"
import { parseStoredPreferences } from "./utils"

export default function useFilteredTransactions(): UseFilteredTransactionsState {
  const { data: accounts } = useAccounts()
  const { isLoading: isLoadingTransactions } = useTransactions()
  const { t } = useI18n()

  const {
    data: preferences,
    error,
    isLoading: isLoadingPreferences,
    setData: setPreferences,
  } = useStoredState<TransactionsPreferences>({
    errorMessage: t("transactions.preferences.persistError"),
    initialValue: DEFAULT_TRANSACTIONS_PREFERENCES,
    parseStoredValue: parseStoredPreferences,
    storageKey: TRANSACTIONS_PREFERENCES_STORAGE_KEY,
  })

  const isLoading = isLoadingPreferences || isLoadingTransactions

  // The stored preferences mapped onto the generic filter/query contract, so
  // the list hooks (useTransactionsList / useInfiniteTransactions) consume them
  // the same way they would consume API-driven filters.
  const filters: FilterTransactionDto = {
    accountId: preferences.accountId > 0 ? preferences.accountId : undefined,
    type:
      preferences.typeFilter === TRANSACTION_TYPE_FILTER.ALL
        ? undefined
        : preferences.typeFilter,
  }

  const query = {
    sortingBy: "date" as const,
    sortingOrder:
      preferences.sortOrder === TRANSACTION_SORT_ORDER.OLDEST
        ? SORT_ORDER.ASC
        : SORT_ORDER.DESC,
  }

  return {
    accounts: accounts ?? [],
    error,
    isLoading,
    preferences,
    filters,
    query,
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
