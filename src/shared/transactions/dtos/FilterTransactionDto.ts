import { type BaseFilterDto, type RangeValue } from "#shared/data"
import { type TransactionType } from "#shared/categories"

// Mirrors the web wallet's FilterTransactionDto (ids are strings here). Ranges
// use RangeValue<start,end> so a future ApiClient encodes them as >= / <=, the
// same way the web's parseQueries does.
export type FilterTransactionDto = BaseFilterDto & {
  accountId?: string
  type?: TransactionType
  category?: string[]
  amount?: RangeValue<number>
  date?: RangeValue<string>
  description?: string
}
