import { type BaseCommonEntityDto } from "#shared/dtos"

export type CommonCurrencyDto = BaseCommonEntityDto & {
  name: string
  symbol: string
}
