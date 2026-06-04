import { type Timestamps } from "#shared/data/storage"

export type Currency = Partial<Timestamps> & {
  id: number
  name: string
  symbol: string
  description?: string
}
