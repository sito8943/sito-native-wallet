import { authRequest } from "#features/auth"

import { ACCOUNTS_ENDPOINT, ACCOUNTS_PULL_PAGE_SIZE } from "./constants"
import {
  type AccountPayload,
  type AccountsPageResponse,
  type RemoteAccount,
} from "./types"

// Remote (REST) account backend. The counterpart to LocalAccountClient: same
// role (the accounts data source), different backing — this one talks to the
// server. Used by accountsSync to push/pull; the local client is what the app
// reads day-to-day (local-first).
export const RemoteAccountClient = {
  fetch: async (): Promise<RemoteAccount[]> => {
    const page = await authRequest<AccountsPageResponse>(
      `${ACCOUNTS_ENDPOINT}?page=0&pageSize=${ACCOUNTS_PULL_PAGE_SIZE}`,
      { auth: true },
    )
    return page.items ?? []
  },

  create: (body: AccountPayload): Promise<number> =>
    authRequest<number>(ACCOUNTS_ENDPOINT, {
      method: "POST",
      body,
      auth: true,
    }),

  update: (remoteId: number, body: AccountPayload): Promise<number> =>
    authRequest<number>(`${ACCOUNTS_ENDPOINT}/${remoteId}`, {
      method: "PATCH",
      body: { id: remoteId, ...body },
      auth: true,
    }),

  // The backend deletes a batch (soft-delete) addressed by a raw array of ids.
  remove: (remoteIds: number[]): Promise<number> =>
    authRequest<number>(ACCOUNTS_ENDPOINT, {
      method: "DELETE",
      body: remoteIds,
      auth: true,
    }),
}
