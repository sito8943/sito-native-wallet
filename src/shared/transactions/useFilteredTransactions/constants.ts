import { type TransactionsPreferences } from "../types"

export const DEFAULT_TRANSACTIONS_PREFERENCES: TransactionsPreferences = {
  accountId: null,
  sortOrder: "newest",
  typeFilter: "all",
}

export const TRANSACTIONS_PREFERENCES_STORAGE_KEY =
  "sito-wallet:transactions-preferences"
