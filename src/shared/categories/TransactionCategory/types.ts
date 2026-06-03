import { type Timestamps } from "#shared/data/storage"

import { type TRANSACTION_TYPE } from "./constants"

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

export type TransactionCategory = Partial<Timestamps> & {
  id: string
  name: string
  description?: string
  color: string
  type: TransactionType
  // System categories (e.g. balance adjustments) are seeded, not user-managed:
  // hidden from the category list and the transaction form picker.
  system?: boolean
}
