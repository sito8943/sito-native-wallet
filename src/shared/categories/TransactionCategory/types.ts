import { type TRANSACTION_TYPE } from "./constants"

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

export type TransactionCategory = {
  id: string
  name: string
  color: string
  type: TransactionType
}
