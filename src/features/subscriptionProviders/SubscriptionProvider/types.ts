import { type Timestamps } from "#shared/data/storage"

export type SubscriptionProvider = Partial<Timestamps> & {
  id: number
  // Backend id once this provider has been synced (the local `id` is a
  // client-generated number that never matches the backend's). Absent for
  // guest-created rows not yet pushed. Addresses PATCH/DELETE and reconciles
  // pulled rows against local ones.
  remoteId?: number
  name: string
  description?: string
  website?: string
  photo?: string
}
