import { type Timestamps } from "#shared/data/storage"

export type Currency = Partial<Timestamps> & {
  id: string
  name: string
  symbol: string
  description?: string
}
