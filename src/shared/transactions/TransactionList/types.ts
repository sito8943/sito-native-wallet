import { type Transaction } from "../Transaction"

export type TransactionListProps = {
  data?: Transaction[]
  emptyMessage?: string
  onTransactionPress?: (transaction: Transaction) => void
}
