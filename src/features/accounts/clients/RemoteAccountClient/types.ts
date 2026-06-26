// An account row as returned by GET /accounts. `type` is the backend enum
// ordinal (0 physical / 1 virtual); `currency` carries the backend currency id,
// resolved to a local currency by remoteId on merge.
export type RemoteAccount = {
  id: number
  name: string
  description?: string | null
  bankName?: string | null
  balance?: number | null
  updatedAt?: string | null
  type: number
  currency?: { id: number } | null
}

// Body for POST / PATCH. The backend maps the owner from `userId` (not the
// token). `currencyId` is the backend currency id (the local currency's
// remoteId). `balance` is honored only on create (UpdateAccountRequest has no
// balance field — balance changes ride on transactions later).
export type AccountPayload = {
  name: string
  description?: string
  bankName?: string
  balance: number
  type: number
  currencyId: number
  userId: number
}

export type AccountsPageResponse = { items?: RemoteAccount[] | null }
