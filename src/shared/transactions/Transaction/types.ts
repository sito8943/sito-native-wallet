import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
} from "../dtos"

// Resolved transaction for display: relations are common DTOs built from the
// live account/categories. The persisted record keeps only their ids.
export type Transaction = {
  id: string
  description: string
  amount: number
  date: string
  account: CommonAccountDto
  categories: CommonTransactionCategoryDto[]
  auto?: boolean
}
