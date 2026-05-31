import { type BaseEntityDto } from "#shared/dtos"

export type CurrencyDto = BaseEntityDto & {
  name: string
  symbol: string
  description: string
}
