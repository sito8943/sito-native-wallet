export type TransactionTypeFilter = "all" | "income" | "expense"

export type TransactionSortOrder = "newest" | "oldest"

export type TransactionsPreferences = {
  accountId: string | null
  sortOrder: TransactionSortOrder
  typeFilter: TransactionTypeFilter
}
