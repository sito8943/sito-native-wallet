import { TRANSACTION_TYPE } from "#shared/categories"

import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
} from "../TransactionsPreferences"

export const TYPE_OPTIONS = [
  { label: "All", value: TRANSACTION_TYPE_FILTER.ALL },
  { label: "Income", value: TRANSACTION_TYPE.INCOME },
  { label: "Expense", value: TRANSACTION_TYPE.EXPENSE },
] as const

export const SORT_OPTIONS = [
  { label: "Newest", value: TRANSACTION_SORT_ORDER.NEWEST },
  { label: "Oldest", value: TRANSACTION_SORT_ORDER.OLDEST },
] as const
