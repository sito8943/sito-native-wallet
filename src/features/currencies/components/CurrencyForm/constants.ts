import { type AddCurrencyDto } from "../../dtos"

export const EMPTY_CURRENCY: AddCurrencyDto = {
  name: "",
  symbol: "",
  description: "",
}

export const CURRENCY_FIELD_LIMITS = {
  NAME: 20,
  SYMBOL: 20,
  DESCRIPTION: 60,
} as const
