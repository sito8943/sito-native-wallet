import { authRequest } from "#features/auth"

import { CATEGORIES_ENDPOINT, CATEGORIES_PULL_PAGE_SIZE } from "./constants"
import {
  type CategoriesPageResponse,
  type CategoryPayload,
  type RemoteCategory,
} from "./types"

export const fetchCategories = async (): Promise<RemoteCategory[]> => {
  const page = await authRequest<CategoriesPageResponse>(
    `${CATEGORIES_ENDPOINT}?page=0&pageSize=${CATEGORIES_PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createCategory = (body: CategoryPayload): Promise<number> =>
  authRequest<number>(CATEGORIES_ENDPOINT, { method: "POST", body, auth: true })

export const updateCategory = (
  remoteId: number,
  body: CategoryPayload,
): Promise<number> =>
  authRequest<number>(`${CATEGORIES_ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteCategories = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(CATEGORIES_ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
