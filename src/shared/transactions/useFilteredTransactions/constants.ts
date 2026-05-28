import { type TransactionsPreferences } from "../TransactionsPreferences"

export const DEFAULT_TRANSACTIONS_PREFERENCES: TransactionsPreferences = {
  accountId: null,
  sortOrder: "newest",
  typeFilter: "all",
}

export const TRANSACTIONS_PREFERENCES_STORAGE_KEY =
  "sito-wallet:transactions-preferences"
