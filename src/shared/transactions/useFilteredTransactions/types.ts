import { type Account } from "#shared/accounts"

import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"
import { type Transaction } from "../Transaction"

export type UseFilteredTransactionsState = {
  accounts: Account[]
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
  preferences: TransactionsPreferences
  resetPreferences: () => void
  setAccountId: (accountId: string | null) => void
  setSortOrder: (sortOrder: TransactionSortOrder) => void
  setTypeFilter: (typeFilter: TransactionTypeFilter) => void
}
