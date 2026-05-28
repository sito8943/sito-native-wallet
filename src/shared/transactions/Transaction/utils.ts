import { TransactionType } from "#shared/categories"

import { type Transaction } from "./types"

export const sortByDate = (transactions: Transaction[]): Transaction[] =>
  [...transactions].sort((a, b) => b.date.localeCompare(a.date))

export const getTransactionType = (transaction: Transaction): TransactionType =>
  transaction.categories[0]?.type ?? TransactionType.Out
