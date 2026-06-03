import { type AddTransactionDto } from "../dtos"
import { type Transaction } from "../Transaction"

export type UseTransactionsOptions = {
  // Restrict `data` to one account. Omit for every transaction.
  accountId?: string
}

export type UseTransactionsState = {
  data: Transaction[]
  error: Error | null
  isLoading: boolean
  addTransaction: (input: AddTransactionDto) => void
  updateTransaction: (id: string, input: AddTransactionDto) => void
  removeTransaction: (id: string) => void
  // Adjusts an account's balance by recording a system adjustment transaction.
  adjustBalance: (
    accountId: string,
    newBalance: number,
    description?: string,
  ) => void
}
