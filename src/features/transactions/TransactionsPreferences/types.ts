import { type TransactionType } from "#features/categories"

import {
  type TRANSACTION_SORT_ORDER,
  type TRANSACTION_TYPE_FILTER,
} from "./constants"

export type TransactionTypeFilter =
  | (typeof TRANSACTION_TYPE_FILTER)[keyof typeof TRANSACTION_TYPE_FILTER]
  | TransactionType

export type TransactionSortOrder =
  (typeof TRANSACTION_SORT_ORDER)[keyof typeof TRANSACTION_SORT_ORDER]

export type TransactionsPreferences = {
  accountId: number
  sortOrder: TransactionSortOrder
  typeFilter: TransactionTypeFilter
}
