import { type DeleteDto } from "#shared/dtos"

export type UpdateCurrencyDto = DeleteDto & {
  name: string
  symbol: string
  description: string
}
