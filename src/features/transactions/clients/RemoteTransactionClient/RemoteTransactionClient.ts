import { authRequest } from "#features/auth"

import { TRANSACTIONS_ENDPOINT, TRANSACTIONS_PULL_PAGE_SIZE } from "./constants"
import {
  type TransactionPayload,
  type TransactionGroupedByType,
  type TransactionsPageResponse,
  type RemoteTransaction,
} from "./types"

// Remote (REST) transaction backend — counterpart to LocalTransactionClient.
// Used by transactionsSync to push/pull; the local client is what the app reads.
export const RemoteTransactionClient = {
  fetch: async (): Promise<RemoteTransaction[]> => {
    const page = await authRequest<TransactionsPageResponse>(
      `${TRANSACTIONS_ENDPOINT}?page=0&pageSize=${TRANSACTIONS_PULL_PAGE_SIZE}`,
      { auth: true },
    )
    return page.items ?? []
  },

  getGroupedByType: (accountId: number): Promise<TransactionGroupedByType> =>
    authRequest<TransactionGroupedByType>(
      `${TRANSACTIONS_ENDPOINT}/grouped-by-type?accountId=${accountId}`,
      { auth: true },
    ),

  create: (body: TransactionPayload): Promise<number> =>
    authRequest<number>(TRANSACTIONS_ENDPOINT, {
      method: "POST",
      body,
      auth: true,
    }),

  update: (remoteId: number, body: TransactionPayload): Promise<number> =>
    authRequest<number>(`${TRANSACTIONS_ENDPOINT}/${remoteId}`, {
      method: "PATCH",
      body: { id: remoteId, ...body },
      auth: true,
    }),

  // The backend deletes a batch (soft-delete) addressed by a raw array of ids.
  remove: (remoteIds: number[]): Promise<number> =>
    authRequest<number>(TRANSACTIONS_ENDPOINT, {
      method: "DELETE",
      body: remoteIds,
      auth: true,
    }),
}
