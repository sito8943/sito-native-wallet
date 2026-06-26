import { type Currency } from "#features/currencies"
import { type Timestamps } from "#shared/data/storage"

import { type ACCOUNT_BANK_NAME, type ACCOUNT_TYPE } from "./constants"

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]
export type AccountBankName =
  (typeof ACCOUNT_BANK_NAME)[keyof typeof ACCOUNT_BANK_NAME]

export type Account = Partial<Timestamps> & {
  id: number
  // Backend id once synced (the local `id` is client-generated and never matches
  // the backend's). Absent for guest-created accounts not yet pushed. Addresses
  // PATCH/DELETE and reconciles pulled rows against local ones.
  remoteId?: number
  name: string
  description?: string
  bankName?: string
  balance: number
  type: AccountType
  currency: Currency
}
