import { type BaseFilterDto } from "#shared/dtos"

export type FilterCurrencyDto = BaseFilterDto & {
  name?: string
  symbol?: string
}
