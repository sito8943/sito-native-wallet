import { type Transaction } from "../Transaction"

export type TransactionCardProps = {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}
