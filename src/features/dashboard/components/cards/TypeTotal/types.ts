import { type TypographyVariant } from "#design/elements/Typography"
import { type TransactionType } from "#features/categories/TransactionCategory"

export type TypeTotalProps = {
  type: TransactionType
  amount: number
  symbol: string
  // Color for the amount text (the badge derives its own color from `type`).
  tone: string
  // Text size of the amount; defaults to DISPLAY.
  variant?: TypographyVariant
}
