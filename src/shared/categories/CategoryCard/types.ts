import { type Action } from "#design/interactions"

import { type TransactionCategory } from "../TransactionCategory"

export type CategoryCardProps = {
  category: TransactionCategory
  actions?: Array<Action<TransactionCategory>>
  onPress?: () => void
}
