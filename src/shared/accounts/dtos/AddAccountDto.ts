import { type Currency } from "#shared/currencies"

import { type AccountType } from "../Account"

export type AddAccountDto = {
  name: string
  description?: string
  bankName?: string
  balance: number
  type: AccountType
  currency: Currency
}
