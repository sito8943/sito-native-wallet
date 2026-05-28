import { type Transaction } from "../Transaction"

export type TransactionListProps = {
  data?: Transaction[]
  emptyMessage?: string
  onPress?: (transaction: Transaction) => void
}
