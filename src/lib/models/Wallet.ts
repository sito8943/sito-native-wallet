export enum TransactionType {
  Out = 0,
  In = 1,
}

export type Currency = {
  id: string
  name: string
  symbol: string
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
  currency: Currency
  categories: TransactionCategory[]
  date: string
}
