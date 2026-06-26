import { type Timestamps } from "#shared/data/storage"

import { type TRANSACTION_TYPE } from "./constants"

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE]

export type TransactionCategory = Partial<Timestamps> & {
  id: number
  // Backend id once this category has been synced to the server (the local
  // `id` is a client-generated number that never matches the backend's). Absent
  // for guest-created categories not yet pushed. Used to address PATCH/DELETE
  // and to reconcile pulled rows against local ones.
  remoteId?: number
  name: string
  description?: string
  color: string
  type: TransactionType
  // System categories (e.g. balance adjustments) are seeded, not user-managed:
  // hidden from the category list and the transaction form picker.
  system?: boolean
  // Marks system-generated categories (shown with an Auto indicator).
  auto?: boolean
}
