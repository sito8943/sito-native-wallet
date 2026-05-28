import { type Transaction } from "../Transaction"

export type UseTransactionsState = {
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
}
