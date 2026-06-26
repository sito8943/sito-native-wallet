import { type Timestamps } from "#shared/data/storage"

import {
  type AddTransactionDto,
  type CommonTransactionCategoryDto,
} from "../../dtos"
import { type Transaction } from "../../Transaction"

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

// One category's slice of a filtered total: its summed amount plus the
// transactions that contributed (the breakdown's expandable rows).
export type CategoryBreakdownEntry = {
  category: CommonTransactionCategoryDto
  total: number
  transactions: Transaction[]
}

// Per-category breakdown of a filtered total. `total` counts each transaction
// once; a category's amount counts every transaction tagged with it, so the
// category sums can exceed `total` for multi-category transactions.
export type CategoryBreakdown = {
  total: number
  categories: CategoryBreakdownEntry[]
}
