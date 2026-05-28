import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { TransactionType } from "#shared/categories"

import {
  type Transaction,
  type TransactionsPreferences,
  type TransactionTypeFilter,
} from "../types"
import { getTransactionType, sortByDate } from "../utils"

import { DEFAULT_TRANSACTIONS_PREFERENCES } from "./constants"

const isTransactionTypeFilter = (
  value: unknown,
): value is TransactionTypeFilter =>
  value === "all" || value === "income" || value === "expense"

const matchesTypeFilter = (
  transaction: Transaction,
  typeFilter: TransactionTypeFilter,
): boolean => {
  if (typeFilter === "all") {
    return true
  }

  const type = getTransactionType(transaction)

  if (typeFilter === "income") {
    return type === TransactionType.In
  }

  return type === TransactionType.Out
}

export const applyTransactionsPreferences = (
  transactions: Transaction[],
  preferences: TransactionsPreferences,
): Transaction[] => {
  const filtered = transactions.filter((transaction) => {
    const matchesAccount =
      preferences.accountId === null ||
      transaction.account.id === preferences.accountId

    return (
      matchesAccount && matchesTypeFilter(transaction, preferences.typeFilter)
    )
  })

  const sorted = sortByDate(filtered)

  if (preferences.sortOrder === "oldest") {
    return sorted.reverse()
  }

  return sorted
}

export const parseTransactionsPreferences = (
  value: unknown,
): TransactionsPreferences => {
  if (!value || typeof value !== "object") {
    return DEFAULT_TRANSACTIONS_PREFERENCES
  }

  const candidate = value as Record<string, unknown>
  const accountId =
    typeof candidate.accountId === "string" && candidate.accountId.length > 0
      ? candidate.accountId
      : null
  const sortOrder = candidate.sortOrder === "oldest" ? "oldest" : "newest"
  const typeFilter = isTransactionTypeFilter(candidate.typeFilter)
    ? candidate.typeFilter
    : "all"

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
    parsed.accountId !== null &&
    !INITIAL_ACCOUNTS.some((account) => account.id === parsed.accountId)
  ) {
    return { ...parsed, accountId: null }
  }

  return parsed
}
