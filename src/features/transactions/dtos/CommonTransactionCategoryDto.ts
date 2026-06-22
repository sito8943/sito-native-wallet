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
  // Mirrors the backend category's `auto` flag. Type-resume uses it to apply
  // the same manual-or-with-any-manual-category rule as the server.
  auto?: boolean
}
