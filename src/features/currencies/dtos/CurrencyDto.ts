import { type BaseEntityDto } from "#shared/data"

export type CurrencyDto = BaseEntityDto & {
  name: string
  symbol: string
  description: string
}
