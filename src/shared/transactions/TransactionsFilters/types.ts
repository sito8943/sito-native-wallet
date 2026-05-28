import { type Account } from "#shared/accounts"

import {
  type TransactionSortOrder,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../TransactionsPreferences"

export type TransactionsFiltersProps = {
  accounts: Account[]
  preferences: TransactionsPreferences
  resetPreferences: () => void
  setAccountId: (accountId: string | null) => void
  setSortOrder: (sortOrder: TransactionSortOrder) => void
  setTypeFilter: (typeFilter: TransactionTypeFilter) => void
}

export type FilterChipProps = {
  isActive: boolean
  label: string
  onPress: () => void
}
