import { type Account } from "#shared/accounts"
import {
  TRANSACTION_TYPE,
  type TransactionCategory,
  type TransactionType,
} from "#shared/categories"

import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
} from "../dtos"
import { type StoredTransaction } from "../TransactionClient"

import { MISSING_ACCOUNT } from "./constants"
import { type Transaction } from "./types"

export const sortByDate = (transactions: Transaction[]): Transaction[] =>
  [...transactions].sort((a, b) => b.date.localeCompare(a.date))

export const getTransactionType = (transaction: Transaction): TransactionType =>
  transaction.categories[0]?.type ?? TRANSACTION_TYPE.EXPENSE

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
