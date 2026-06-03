export type AddTransactionDto = {
  description: string
  amount: number
  date: string
  accountId: string
  categoryIds: string[]
  // System-generated (e.g. a balance adjustment) rather than user-entered.
  auto?: boolean
}
