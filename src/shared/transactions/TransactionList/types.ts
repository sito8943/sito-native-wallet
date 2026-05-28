import { type Transaction } from "../types"

export type TransactionListPropsType = {
  data?: Transaction[]
  emptyMessage?: string
  onTransactionPress?: (transaction: Transaction) => void
}
