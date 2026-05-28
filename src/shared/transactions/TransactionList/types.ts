import { type Transaction } from "../Transaction"

export type TransactionListPropsType = {
  data?: Transaction[]
  emptyMessage?: string
  onTransactionPress?: (transaction: Transaction) => void
}
