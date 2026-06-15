// A currency row as returned by GET /currencies.
export type RemoteCurrency = {
  id: number
  name: string
  description?: string | null
  symbol: string
}

// Body for POST / PATCH. The backend maps the owner from `userId` (not from the
// token), so it must be sent.
export type CurrencyPayload = {
  name: string
  description?: string
  symbol: string
  userId: number
}

export type CurrenciesPageResponse = { items?: RemoteCurrency[] | null }
