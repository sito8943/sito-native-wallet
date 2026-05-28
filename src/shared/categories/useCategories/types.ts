import { type TransactionCategory } from "../TransactionCategory"

export type UseCategoriesState = {
  data: TransactionCategory[] | null
  error: Error | null
  isLoading: boolean
}
