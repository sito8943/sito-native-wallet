import { type AddTransactionDto } from "../dtos"
import { type Transaction } from "../Transaction"

export type UseTransactionsOptions = {
  // Restrict `data` to one account. Omit for every transaction.
  accountId?: number
}

export type UseTransactionsState = {
  data: Transaction[]
  error: Error | null
  isLoading: boolean
  addTransaction: (input: AddTransactionDto) => void
  updateTransaction: (id: number, input: AddTransactionDto) => void
  removeTransaction: (id: number) => void
  // Adjusts an account's balance by recording a system adjustment transaction.
  adjustBalance: (
    accountId: number,
    newBalance: number,
    description?: string,
  ) => void
}
