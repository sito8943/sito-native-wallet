import { type Account } from "#shared/accounts"
import {
  TRANSACTION_TYPE,
  type TransactionCategory,
  type TransactionType,
} from "#shared/categories"

import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
  type FilterTransactionDto,
} from "../dtos"
import { type StoredTransaction } from "../TransactionClient"

import { MISSING_ACCOUNT } from "./constants"
import { type Transaction } from "./types"

export const sortByDate = (transactions: Transaction[]): Transaction[] =>
  [...transactions].sort((a, b) => b.date.localeCompare(a.date))

export const getTransactionType = (transaction: Transaction): TransactionType =>
  transaction.categories[0]?.type ?? TRANSACTION_TYPE.EXPENSE

// Translates a FilterTransactionDto into a predicate over a resolved
// transaction. Lives here (not in the client) because filtering touches joined
// fields (type, category) that only exist after resolution. A future ApiClient
// sends these filters to the server instead of matching in memory.
export const matchesTransactionFilter =
  (filters: FilterTransactionDto) =>
  (transaction: Transaction): boolean => {
    if (
      filters.accountId !== undefined &&
      transaction.account.id !== filters.accountId
    ) {
      return false
    }

    if (
      filters.type !== undefined &&
      getTransactionType(transaction) !== filters.type
    ) {
      return false
    }

    if (
      filters.category !== undefined &&
      filters.category.length > 0 &&
      !transaction.categories.some((category) =>
        filters.category?.includes(category.id),
      )
    ) {
      return false
    }

    if (filters.amount !== undefined) {
      const { start, end } = filters.amount
      if (start != null && transaction.amount < start) {
        return false
      }
      if (end != null && transaction.amount > end) {
        return false
      }
    }

    if (filters.date !== undefined) {
      const { start, end } = filters.date
      if (start != null && transaction.date < start) {
        return false
      }
      if (end != null && transaction.date > end) {
        return false
      }
    }

    if (
      filters.description !== undefined &&
      filters.description.trim() !== "" &&
      !transaction.description
        .toLowerCase()
        .includes(filters.description.trim().toLowerCase())
    ) {
      return false
    }

    return true
  }

const toCommonAccount = (account: Account): CommonAccountDto => ({
  id: account.id,
  name: account.name,
  currencySymbol: account.currency.symbol,
})

const toCommonCategory = (
  category: TransactionCategory,
): CommonTransactionCategoryDto => ({
  id: category.id,
  name: category.name,
  description: category.description,
  color: category.color,
  type: category.type,
})

const resolveTransaction = (
  stored: StoredTransaction,
  accounts: Account[],
  categories: TransactionCategory[],
): Transaction => {
  const account = accounts.find((item) => item.id === stored.accountId)

  return {
    id: stored.id,
    description: stored.description,
    amount: stored.amount,
    date: stored.date,
    auto: stored.auto,
    account: account ? toCommonAccount(account) : MISSING_ACCOUNT,
    categories: stored.categoryIds
      .map((id) => categories.find((category) => category.id === id))
      .filter(
        (category): category is TransactionCategory => category !== undefined,
      )
      .map(toCommonCategory),
  }
}

export const resolveTransactions = (
  stored: StoredTransaction[],
  accounts: Account[],
  categories: TransactionCategory[],
): Transaction[] =>
  stored.map((item) => resolveTransaction(item, accounts, categories))
