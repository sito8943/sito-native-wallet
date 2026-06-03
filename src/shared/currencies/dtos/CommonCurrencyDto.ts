import { type BaseCommonEntityDto } from "#shared/data"

export type CommonCurrencyDto = BaseCommonEntityDto & {
  name: string
  symbol: string
}
