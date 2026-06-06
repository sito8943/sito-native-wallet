import { type BaseFilterDto } from "#shared/data"

// Mirrors the web wallet's FilterAccountDto (ids are strings here).
export type FilterAccountDto = BaseFilterDto & {
  name?: string
  currencyId?: number
}
