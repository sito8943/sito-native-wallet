import { TRANSACTION_TYPE } from "#features/categories"

import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
} from "../../TransactionsPreferences"

export const TYPE_OPTIONS = [
  {
    labelKey: "transactions.filters.type.all",
    value: TRANSACTION_TYPE_FILTER.ALL,
  },
  {
    labelKey: "transactions.filters.type.income",
    value: TRANSACTION_TYPE.INCOME,
  },
  {
    labelKey: "transactions.filters.type.expense",
    value: TRANSACTION_TYPE.EXPENSE,
  },
] as const

export const SORT_OPTIONS = [
  {
    labelKey: "transactions.filters.sort.newest",
    value: TRANSACTION_SORT_ORDER.NEWEST,
  },
  {
    labelKey: "transactions.filters.sort.oldest",
    value: TRANSACTION_SORT_ORDER.OLDEST,
  },
] as const
