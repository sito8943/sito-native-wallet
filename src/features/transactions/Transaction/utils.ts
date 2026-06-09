import { type Account } from "#features/accounts"
// Deep path on purpose: importing the #features/categories barrel here (a value
// import) would close the Manager cycle once the TransactionClient imports this
// module to resolve transactions. The TransactionCategory module has no such
// dependency.
import {
  TRANSACTION_TYPE,
  type TransactionCategory,
  type TransactionType,
} from "#features/categories/TransactionCategory"

import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
  type FilterTransactionDto,
} from "../dtos"
import { type StoredTransaction } from "../TransactionClient"

import { getMissingAccount } from "./constants"
import { type Transaction } from "./types"

export const getTransactionType = (transaction: Transaction): TransactionType =>
  transaction.categories[0]?.type ?? TRANSACTION_TYPE.EXPENSE

// Translates a FilterTransactionDto into a predicate over a resolved
// transaction, used by TransactionClient.list (the backend seam). Filtering
// touches joined fields (type, category) that only exist after resolution; a
// future ApiClient sends these filters to the server instead.
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
      // Filter bounds are day-granular; transaction.date carries a time, so
      // compare only its day portion (else same-day-as-`end` rows would drop).
      const day = transaction.date.slice(0, 10)
      if (start != null && day < start) {
        return false
      }
      if (end != null && day > end) {
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
    account: account ? toCommonAccount(account) : getMissingAccount(),
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
