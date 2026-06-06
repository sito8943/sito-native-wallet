import { type BaseFilterDto } from "#shared/data"

export type FilterCurrencyDto = BaseFilterDto & {
  name?: string
  symbol?: string
}
