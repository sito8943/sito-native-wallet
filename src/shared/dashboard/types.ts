import { type TransactionType } from "#shared/categories"

export type DateRange = { start?: string; end?: string }

export type SumFilter = {
  type: TransactionType
  accountId?: number
  start?: string
  end?: string
}
