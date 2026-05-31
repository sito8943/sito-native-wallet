import { type AddTransactionDto } from "../dtos"

// Persisted transaction record: relations stored as ids only.
export type StoredTransaction = AddTransactionDto & {
  id: string
}
