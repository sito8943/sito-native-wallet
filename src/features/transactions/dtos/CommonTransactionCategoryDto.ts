import { type TransactionType } from "#features/categories"

// Lightweight category shape for displaying a transaction's relations. Forms
// send categoryIds; reads resolve them to these common DTOs from live
// categories.
export type CommonTransactionCategoryDto = {
  id: number
  name: string
  description?: string
  color: string
  type: TransactionType
}
