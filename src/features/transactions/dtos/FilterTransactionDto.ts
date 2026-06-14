import { type TransactionType } from "#features/categories"
import { type BaseFilterDto, type RangeValue } from "#shared/data"

// Mirrors the web wallet's FilterTransactionDto (ids are strings here). Ranges
// use RangeValue<start,end> so a future ApiClient encodes them as >= / <=, the
// same way the web's parseQueries does.
export type FilterTransactionDto = BaseFilterDto & {
  accountId?: number
  type?: TransactionType
  category?: number[]
  // Drop transactions in any of these categories (e.g. a type-resume total that
  // ignores transfers/refunds). Applied after `category` include.
  excludeCategory?: number[]
  amount?: RangeValue<number>
  date?: RangeValue<string>
  description?: string
}
