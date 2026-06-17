// A transaction row as returned by GET /transactions. Relations come as nested
// objects carrying the backend id; resolved to local rows by remoteId on merge.
// `date` is a backend LocalDateTime ("2025-06-17T14:30:00"). The backend derives
// the transaction's income/expense type from its category, so it isn't returned
// as a separate field here.
export type RemoteTransaction = {
  id: number
  description?: string | null
  amount: number
  date?: string | null
  auto?: boolean
  account?: { id: number } | null
  categories?: Array<{ id: number }> | null
  category?: { id: number } | null
}

// Body for POST / PATCH. Unlike the other entities, the backend takes NO
// `userId` (the owner is the account's user, resolved from the auth token) and
// NO `type` (derived from the categories). `accountId` + `categoryIds` are
// backend ids (the local rows' remoteIds). `date` is an ISO LocalDateTime.
export type TransactionPayload = {
  description?: string
  accountId: number
  amount: number
  date: string
  categoryIds: number[]
}

export type TransactionsPageResponse = { items?: RemoteTransaction[] | null }
