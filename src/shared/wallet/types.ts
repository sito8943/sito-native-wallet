export enum TransactionType {
  Out = 0,
  In = 1,
}

export type Currency = {
  id: string
  name: string
  symbol: string
}

export type Account = {
  id: string
  name: string
  balance: number
  currency: Currency
}

export type TransactionCategory = {
  id: string
  name: string
  color: string
  type: TransactionType
}

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

export type CategoryBulletPropsType = {
  category: TransactionCategory
}

export type CategoryCardPropsType = {
  category: TransactionCategory
}

export type CurrencyCardPropsType = {
  currency: Currency
}

export type AccountCardPropsType = {
  account: Account
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
