import { type TransactionType } from "../TransactionCategory"

export type AddCategoryDto = {
  name: string
  color: string
  type: TransactionType
}
