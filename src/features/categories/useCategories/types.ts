import { type QueryParam, type QueryResult } from "#shared/data"

import { type AddCategoryDto, type FilterCategoryDto } from "../dtos"
import { type TransactionCategory } from "../TransactionCategory"

export type UseCategoriesOptions = {
  // Include system categories (e.g. balance adjustment). Defaults to true (all
  // categories). Management/list views pass false to hide them so the user
  // can't edit or assign them by hand.
  includeSystem?: boolean
  filters?: FilterCategoryDto
  query?: QueryParam<TransactionCategory>
}

export type UseCategoriesState = {
  data: TransactionCategory[]
  result: QueryResult<TransactionCategory>
  error: Error | null
  isLoading: boolean
  addCategory: (input: AddCategoryDto) => void
  addCategories: (inputs: AddCategoryDto[]) => void
  updateCategory: (id: number, input: AddCategoryDto) => void
  removeCategory: (id: number) => void
}
