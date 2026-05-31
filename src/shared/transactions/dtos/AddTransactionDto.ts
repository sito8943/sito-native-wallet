export type AddTransactionDto = {
  description: string
  amount: number
  date: string
  accountId: string
  categoryIds: string[]
}
