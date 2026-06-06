export type AddTransactionDto = {
  description: string
  amount: number
  date: string
  accountId: number
  categoryIds: number[]
  // System-generated (e.g. a balance adjustment) rather than user-entered.
  auto?: boolean
}
