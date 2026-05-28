import { type Transaction } from "../types"

export type TransactionCardPropsType = {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}
