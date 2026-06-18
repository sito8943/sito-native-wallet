import { type FilterTransactionDto } from "#features/transactions"

export type CategoryBreakdownSheetProps = {
  open: boolean
  onClose: () => void
  // Same filter the card's total uses (type, account, date range, excludes).
  filters: FilterTransactionDto
  // Currency symbol for the per-category amounts.
  symbol: string
  title: string
}
