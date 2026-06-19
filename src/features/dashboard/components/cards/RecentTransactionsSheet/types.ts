import { type FilterTransactionDto } from "#features/transactions"

export type RecentTransactionsSheetProps = {
  open: boolean
  onClose: () => void
  // Same filter the card's total uses (type, account, date range, excludes).
  filters: FilterTransactionDto
  title: string
}
