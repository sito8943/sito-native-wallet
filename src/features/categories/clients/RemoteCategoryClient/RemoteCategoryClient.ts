import { authRequest } from "#features/auth"

import { CATEGORIES_ENDPOINT, CATEGORIES_PULL_PAGE_SIZE } from "./constants"
import {
  type CategoriesPageResponse,
  type CategoryPayload,
  type RemoteCategory,
} from "./types"

// Remote (REST) category backend — counterpart to LocalCategoryClient. Used by
// categoriesSync to push/pull; the local client is what the app reads.
export const RemoteCategoryClient = {
  fetch: async (): Promise<RemoteCategory[]> => {
    const page = await authRequest<CategoriesPageResponse>(
      `${CATEGORIES_ENDPOINT}?page=0&pageSize=${CATEGORIES_PULL_PAGE_SIZE}`,
      { auth: true },
    )
    return page.items ?? []
  },

  create: (body: CategoryPayload): Promise<number> =>
    authRequest<number>(CATEGORIES_ENDPOINT, {
      method: "POST",
      body,
      auth: true,
    }),

  update: (remoteId: number, body: CategoryPayload): Promise<number> =>
    authRequest<number>(`${CATEGORIES_ENDPOINT}/${remoteId}`, {
      method: "PATCH",
      body: { id: remoteId, ...body },
      auth: true,
    }),

  // The backend deletes a batch (soft-delete) addressed by a raw array of ids.
  remove: (remoteIds: number[]): Promise<number> =>
    authRequest<number>(CATEGORIES_ENDPOINT, {
      method: "DELETE",
      body: remoteIds,
      auth: true,
    }),
}
