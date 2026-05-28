import { type Transaction } from "../Transaction"

export type TransactionCardPropsType = {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}
