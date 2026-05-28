import { type Account } from "#shared/accounts"
import { type TransactionCategory } from "#shared/categories"

export type Transaction = {
  id: string
  description: string
  amount: number
  account: Account
  categories: TransactionCategory[]
  date: string
}
