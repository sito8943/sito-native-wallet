import { type TransactionType } from "#features/categories"

export type TransactionTypeBadgeProps = {
  type: TransactionType
  showIcon?: boolean
  showText?: boolean
  filled?: boolean
}
