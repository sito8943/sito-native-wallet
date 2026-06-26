import { type AddCategoryDto } from "../../dtos"
import { type TransactionCategory } from "../../TransactionCategory"

export type UseCategoryState = {
  data: TransactionCategory | null
  error: Error | null
  isLoading: boolean
  update: (input: AddCategoryDto) => void
  remove: () => void
}
