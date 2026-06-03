import { type Timestamps } from "#shared/data/storage"

export type SubscriptionProvider = Partial<Timestamps> & {
  id: string
  name: string
  description?: string
  website?: string
  photo?: string
}
