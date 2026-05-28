import { type TransactionType } from "#shared/categories"

export type TransactionTypeBadgePropsType = {
  type: TransactionType
  showIcon?: boolean
  showText?: boolean
  filled?: boolean
}
