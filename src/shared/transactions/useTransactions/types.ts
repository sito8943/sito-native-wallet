import { type AddTransactionDto } from "../dtos"
import { type Transaction } from "../Transaction"

export type UseTransactionsState = {
  data: Transaction[]
  error: Error | null
  isLoading: boolean
  addTransaction: (input: AddTransactionDto) => void
  updateTransaction: (id: string, input: AddTransactionDto) => void
  removeTransaction: (id: string) => void
}
