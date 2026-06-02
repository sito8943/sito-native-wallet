import { type TransactionType } from "#shared/categories"

// Lightweight category shape for displaying a transaction's relations. Forms
// send categoryIds; reads resolve them to these common DTOs from live
// categories.
export type CommonTransactionCategoryDto = {
  id: string
  name: string
  description?: string
  color: string
  type: TransactionType
}
