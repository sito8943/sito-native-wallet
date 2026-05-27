import { type Account } from "#shared/accounts"
import {
  type TransactionCategory,
  type TransactionType,
} from "#shared/categories"

export type Transaction = {
  id: string
  description: string
  amount: number
  account: Account
  categories: TransactionCategory[]
  date: string
}

export type UseTransactionsState = {
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
}

export type TransactionCardPropsType = {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}

export type TransactionTypeBadgePropsType = {
  type: TransactionType
}

export type TransactionListPropsType = {
  data?: Transaction[]
  onTransactionPress?: (transaction: Transaction) => void
}
