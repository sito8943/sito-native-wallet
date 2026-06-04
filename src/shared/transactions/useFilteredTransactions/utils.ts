import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { TRANSACTION_TYPE } from "#shared/categories"

import { type Transaction } from "../Transaction"
import { getTransactionType, sortByDate } from "../Transaction"
import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
  type TransactionsPreferences,
  type TransactionTypeFilter,
  type TransactionSortOrder,
} from "../TransactionsPreferences"

import { DEFAULT_TRANSACTIONS_PREFERENCES } from "./constants"

const isTransactionTypeFilter = (
  value: unknown,
): value is TransactionTypeFilter =>
  value === TRANSACTION_TYPE_FILTER.ALL ||
  value === TRANSACTION_TYPE.INCOME ||
  value === TRANSACTION_TYPE.EXPENSE

const matchesTypeFilter = (
  transaction: Transaction,
  typeFilter: TransactionTypeFilter,
): boolean => {
  if (typeFilter === TRANSACTION_TYPE_FILTER.ALL) {
    return true
  }

  return getTransactionType(transaction) === typeFilter
}

export const applyTransactionsPreferences = (
  transactions: Transaction[],
  preferences: TransactionsPreferences,
): Transaction[] => {
  const filtered = transactions.filter((transaction) => {
    const matchesAccount =
      preferences.accountId === 0 ||
      transaction.account.id === preferences.accountId

    return (
      matchesAccount && matchesTypeFilter(transaction, preferences.typeFilter)
    )
  })

  const sorted = sortByDate(filtered)

  if (preferences.sortOrder === TRANSACTION_SORT_ORDER.OLDEST) {
    return sorted.reverse()
  }

  return sorted
}

const parseTransactionsPreferences = (
  value: unknown,
): TransactionsPreferences => {
  if (!value || typeof value !== "object") {
    return DEFAULT_TRANSACTIONS_PREFERENCES
  }

  const candidate = value as Record<string, unknown>
  const accountId =
    typeof candidate.accountId === "number" && candidate.accountId > 0
      ? candidate.accountId
      : 0
  const sortOrder: TransactionSortOrder =
    candidate.sortOrder === TRANSACTION_SORT_ORDER.OLDEST
      ? TRANSACTION_SORT_ORDER.OLDEST
      : TRANSACTION_SORT_ORDER.NEWEST
  const typeFilter = isTransactionTypeFilter(candidate.typeFilter)
    ? candidate.typeFilter
    : TRANSACTION_TYPE_FILTER.ALL

  return {
    accountId,
    sortOrder,
    typeFilter,
  }
}

export const parseStoredPreferences = (
  value: unknown,
): TransactionsPreferences => {
  const parsed = parseTransactionsPreferences(value)

  if (
    parsed.accountId !== 0 &&
    !INITIAL_ACCOUNTS.some((account) => account.id === parsed.accountId)
  ) {
    return { ...parsed, accountId: 0 }
  }

  return parsed
}
