import { type TransactionType } from "../TransactionCategory"

export type AddCategoryDto = {
  name: string
  description?: string
  color: string
  type: TransactionType
}
