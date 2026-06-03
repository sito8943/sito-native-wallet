import { type BaseFilterDto } from "#shared/data"

import { type TransactionType } from "../TransactionCategory"

// Mirrors the web wallet's FilterTransactionCategoryDto.
export type FilterCategoryDto = BaseFilterDto & {
  name?: string
  type?: TransactionType
}
