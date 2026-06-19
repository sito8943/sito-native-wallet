import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"

export type TransactionsFilterSheetProps = {
  open: boolean
  onClose: () => void
  preferences: TransactionsPreferences
  setSortOrder: (sortOrder: TransactionSortOrder) => void
  setTypeFilter: (typeFilter: TransactionTypeFilter) => void
}
