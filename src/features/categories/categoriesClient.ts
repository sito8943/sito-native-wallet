import { authRequest } from "#features/auth"

import { type TransactionType } from "./TransactionCategory"

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

type PageResponse<T> = { items?: T[] | null }

const ENDPOINT = "/transaction-categories"
// One page big enough to hold every category a user realistically has; the
// backend rejects pageSize 0, so we ask for a generous cap instead.
const PULL_PAGE_SIZE = 500

export const fetchCategories = async (): Promise<RemoteCategory[]> => {
  const page = await authRequest<PageResponse<RemoteCategory>>(
    `${ENDPOINT}?page=0&pageSize=${PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createCategory = (body: CategoryPayload): Promise<number> =>
  authRequest<number>(ENDPOINT, { method: "POST", body, auth: true })

export const updateCategory = (
  remoteId: number,
  body: CategoryPayload,
): Promise<number> =>
  authRequest<number>(`${ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteCategories = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
