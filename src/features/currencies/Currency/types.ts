import { type Timestamps } from "#shared/data/storage"

export type Currency = Partial<Timestamps> & {
  id: number
  // Backend id once this currency has been synced (the local `id` is a
  // client-generated number that never matches the backend's). Absent for
  // guest-created currencies not yet pushed. Addresses PATCH/DELETE and
  // reconciles pulled rows against local ones.
  remoteId?: number
  name: string
  symbol: string
  description?: string
}
