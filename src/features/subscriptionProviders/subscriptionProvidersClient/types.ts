// A provider row as returned by GET /subscription-providers. The backend
// returns the image under `photo`. No foreign keys — providers are standalone.
export type RemoteSubscriptionProvider = {
  id: number
  name: string
  description?: string | null
  website?: string | null
  photo?: string | null
}

// Body for POST / PATCH. The backend maps the owner from `userId` (resolved
// from the token when 0, but we send the real id like the other entities).
// `photo` is intentionally omitted: the backend takes it as a separate
// multipart upload, not synced here.
export type SubscriptionProviderPayload = {
  name: string
  description?: string
  website?: string
  userId: number
}

export type SubscriptionProvidersPageResponse = {
  items?: RemoteSubscriptionProvider[] | null
}
