import { type Account } from "#shared/accounts"
import {
  type TransactionCategory,
  type TransactionType,
} from "#shared/categories"

export type Transaction = {
  id: string
  description: string
  amount: number
  account: Account
  categories: TransactionCategory[]
  date: string
}

export type UseTransactionsState = {
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
}

export type TransactionTypeFilter = "all" | "income" | "expense"

export type TransactionSortOrder = "newest" | "oldest"

export type TransactionsPreferences = {
  accountId: string | null
  sortOrder: TransactionSortOrder
  typeFilter: TransactionTypeFilter
}

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

export type TransactionCardPropsType = {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}

export type TransactionTypeBadgePropsType = {
  type: TransactionType
}

export type TransactionListPropsType = {
  data?: Transaction[]
  emptyMessage?: string
  onTransactionPress?: (transaction: Transaction) => void
}
