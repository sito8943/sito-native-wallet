import { type TransactionType } from "#shared/categories"

export type DateRange = { start?: string; end?: string }

export type SumFilter = {
  type: TransactionType
  // Empty/undefined → every account; otherwise restrict to these account ids.
  accountIds?: number[]
  start?: string
  end?: string
}
