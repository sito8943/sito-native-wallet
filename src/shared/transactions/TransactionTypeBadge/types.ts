import { type TransactionType } from "#shared/categories"

export type TransactionTypeBadgeProps = {
  type: TransactionType
  showIcon?: boolean
  showText?: boolean
  filled?: boolean
}
