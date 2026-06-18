import { authRequest } from "#features/auth"

import { TRANSACTIONS_ENDPOINT, TRANSACTIONS_PULL_PAGE_SIZE } from "./constants"
import {
  type TransactionPayload,
  type TransactionsPageResponse,
  type RemoteTransaction,
} from "./types"

export const fetchTransactions = async (): Promise<RemoteTransaction[]> => {
  const page = await authRequest<TransactionsPageResponse>(
    `${TRANSACTIONS_ENDPOINT}?page=0&pageSize=${TRANSACTIONS_PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createTransaction = (body: TransactionPayload): Promise<number> =>
  authRequest<number>(TRANSACTIONS_ENDPOINT, {
    method: "POST",
    body,
    auth: true,
  })

export const updateTransaction = (
  remoteId: number,
  body: TransactionPayload,
): Promise<number> =>
  authRequest<number>(`${TRANSACTIONS_ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteTransactions = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(TRANSACTIONS_ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
