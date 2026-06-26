export type AddTransferDto = {
  fromAccountId: number
  toAccountId: number
  amount: number
  date: string
  description?: string
}
