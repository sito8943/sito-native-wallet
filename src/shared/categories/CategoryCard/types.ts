import { type Action } from "#shared/actions"

import { type TransactionCategory } from "../TransactionCategory"

export type CategoryCardProps = {
  category: TransactionCategory
  actions?: Array<Action<TransactionCategory>>
  onPress?: () => void
}
