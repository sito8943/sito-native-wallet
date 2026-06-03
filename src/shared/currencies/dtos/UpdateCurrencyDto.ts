import { type DeleteDto } from "#shared/data"

export type UpdateCurrencyDto = DeleteDto & {
  name: string
  symbol: string
  description: string
}
