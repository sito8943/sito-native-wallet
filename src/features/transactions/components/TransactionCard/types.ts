import { type Action } from "#design/interactions"

import { type Transaction } from "../Transaction"

export type TransactionCardProps = {
  transaction: Transaction
  actions?: Array<Action<Transaction>>
  onPress?: (transaction: Transaction) => void
  // Drops the card's elevation (e.g. nested inside the category breakdown).
  flat?: boolean
}
