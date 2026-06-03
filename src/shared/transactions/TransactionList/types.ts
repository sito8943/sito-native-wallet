import { type Action } from "#design/interactions"

import { type Transaction } from "../Transaction"

export type TransactionListProps = {
  data?: Transaction[]
  emptyMessage?: string
  onPress?: (transaction: Transaction) => void
  actionsFor?: (transaction: Transaction) => Array<Action<Transaction>>
}
