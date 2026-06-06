import { type Timestamps } from "#shared/data/storage"

import { type AddTransactionDto } from "../dtos"

// Persisted transaction record: relations stored as ids only.
export type StoredTransaction = AddTransactionDto &
  Partial<Timestamps> & {
    id: number
  }
