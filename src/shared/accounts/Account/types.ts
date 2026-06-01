import { type Currency } from "#shared/currencies"

import { type ACCOUNT_TYPE } from "./constants"

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]

export type Account = {
  id: string
  name: string
  balance: number
  type: AccountType
  currency: Currency
}
