import { type Transaction } from "../../lib/models/Wallet"

export type UseTransactionsState = {
  data: Transaction[] | null
  error: Error | null
  isLoading: boolean
}
