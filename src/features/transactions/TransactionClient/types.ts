import { type Timestamps } from "#shared/data/storage"

import { type AddTransactionDto } from "../dtos"

// Persisted transaction record: relations stored as ids only.
export type StoredTransaction = AddTransactionDto &
  Partial<Timestamps> & {
    id: number
    // Backend id once this transaction has been synced (the local `id` is a
    // client-generated number that never matches the backend's). Absent for
    // guest-created rows not yet pushed. Addresses PATCH/DELETE and reconciles
    // pulled rows against local ones.
    remoteId?: number
  }
