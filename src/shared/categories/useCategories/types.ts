import { type AddCategoryDto } from "../dtos"
import { type TransactionCategory } from "../TransactionCategory"

export type UseCategoriesOptions = {
  // Include system categories (e.g. balance adjustment). Defaults to true (all
  // categories). Management/list views pass false to hide them so the user
  // can't edit or assign them by hand.
  includeSystem?: boolean
}

export type UseCategoriesState = {
  data: TransactionCategory[]
  error: Error | null
  isLoading: boolean
  addCategory: (input: AddCategoryDto) => void
  addCategories: (inputs: AddCategoryDto[]) => void
  updateCategory: (id: string, input: AddCategoryDto) => void
  removeCategory: (id: string) => void
}
