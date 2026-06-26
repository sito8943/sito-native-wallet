export type TransactionsSummaryProps = {
  // Income/expense totals for the scoped account (always both, regardless of the
  // active type filter), and the currency symbol to format them with.
  income: number
  expense: number
  symbol: string
}
