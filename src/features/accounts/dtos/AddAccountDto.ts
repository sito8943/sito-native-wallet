import { type Currency } from "#features/currencies"

import { type AccountType } from "../Account"

export type AddAccountDto = {
  name: string
  description?: string
  bankName?: string
  balance: number
  type: AccountType
  currency: Currency
}
