import { type TransactionType } from "../TransactionCategory"

// A category row as returned by GET /transaction-categories. The backend serves
// `type` as its int code (0/1), which matches our TransactionType. `auto` marks
// the backend's own system categories — we keep our local ones and skip those.
export type RemoteCategory = {
  id: number
  name: string
  description?: string | null
  color?: string | null
  type: TransactionType
  auto?: boolean
}

// Body for POST / PATCH. The backend maps the owner from `userId` (not from the
// token), so it must be sent. `type` goes as the numeric code (Jackson maps it
// to the enum by ordinal: 0 → OUT, 1 → IN).
export type CategoryPayload = {
  name: string
  description?: string
  color: string
  type: TransactionType
  userId: number
}

export type CategoriesPageResponse = { items?: RemoteCategory[] | null }
