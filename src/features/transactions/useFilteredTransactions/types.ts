import { type Account } from "#features/accounts"
import { type QueryParam } from "#shared/data"

import { type FilterTransactionDto } from "../dtos"
import { type Transaction } from "../Transaction"
import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"

export type UseFilteredTransactionsState = {
  accounts: Account[]
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
  preferences: TransactionsPreferences
  // Preferences mapped to the generic filter/query contract for the list hooks.
  filters: FilterTransactionDto
  query: QueryParam<Transaction>
  resetPreferences: () => void
  setAccountId: (accountId: number) => void
  setSortOrder: (sortOrder: TransactionSortOrder) => void
  setTypeFilter: (typeFilter: TransactionTypeFilter) => void
}
