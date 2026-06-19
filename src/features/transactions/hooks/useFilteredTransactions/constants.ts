import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
  type TransactionsPreferences,
} from "../../TransactionsPreferences"

export const DEFAULT_TRANSACTIONS_PREFERENCES: TransactionsPreferences = {
  accountId: 0,
  sortOrder: TRANSACTION_SORT_ORDER.NEWEST,
  typeFilter: TRANSACTION_TYPE_FILTER.ALL,
}

export const TRANSACTIONS_PREFERENCES_STORAGE_KEY =
  "sito-wallet:transactions-preferences"
