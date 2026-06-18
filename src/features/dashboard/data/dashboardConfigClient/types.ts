// A dashboard card as returned by GET /user-dashboard-config. `type` is the
// backend DashboardCardType ordinal; `config` is the opaque JSON config string.
export type RemoteDashboardCard = {
  id: number
  type: number
  title?: string | null
  config?: string | null
  position?: number | null
}

// Body for POST / PATCH. The backend maps the owner from `userId` (not the
// token). `config` is the opaque JSON string; `type` is the ordinal.
export type DashboardCardPayload = {
  type: number
  title?: string | null
  config?: string | null
  position: number
  userId: number
}

export type DashboardConfigPageResponse = {
  items?: RemoteDashboardCard[] | null
}
