import { type TransactionType } from "#shared/categories"

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
  accountId: string | null
  sortOrder: TransactionSortOrder
  typeFilter: TransactionTypeFilter
}
