import { type Currency } from "#shared/currencies"

export type Account = {
  id: string
  name: string
  balance: number
  currency: Currency
}
