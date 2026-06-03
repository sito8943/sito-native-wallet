import { type AddCategoryDto } from "../dtos"
import { type TransactionCategory } from "../TransactionCategory"

export type UseCategoriesState = {
  data: TransactionCategory[]
  error: Error | null
  isLoading: boolean
  addCategory: (input: AddCategoryDto) => void
  addCategories: (inputs: AddCategoryDto[]) => void
  updateCategory: (id: string, input: AddCategoryDto) => void
  removeCategory: (id: string) => void
}
