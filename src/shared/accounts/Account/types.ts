import { type Currency } from "#shared/currencies"
import { type Timestamps } from "#shared/data/storage"

import { type ACCOUNT_BANK_NAME, type ACCOUNT_TYPE } from "./constants"

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]
export type AccountBankName =
  (typeof ACCOUNT_BANK_NAME)[keyof typeof ACCOUNT_BANK_NAME]

export type Account = Partial<Timestamps> & {
  id: string
  name: string
  description?: string
  bankName?: string
  balance: number
  type: AccountType
  currency: Currency
}
