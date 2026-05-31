import { type Action } from "#shared/actions"

import { type Transaction } from "../Transaction"

export type TransactionCardProps = {
  transaction: Transaction
  actions?: Array<Action<Transaction>>
  onPress?: (transaction: Transaction) => void
}
