import { authRequest } from "#features/auth"

import { ACCOUNTS_ENDPOINT, ACCOUNTS_PULL_PAGE_SIZE } from "./constants"
import {
  type AccountPayload,
  type AccountsPageResponse,
  type RemoteAccount,
} from "./types"

export const fetchAccounts = async (): Promise<RemoteAccount[]> => {
  const page = await authRequest<AccountsPageResponse>(
    `${ACCOUNTS_ENDPOINT}?page=0&pageSize=${ACCOUNTS_PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createAccount = (body: AccountPayload): Promise<number> =>
  authRequest<number>(ACCOUNTS_ENDPOINT, { method: "POST", body, auth: true })

export const updateAccount = (
  remoteId: number,
  body: AccountPayload,
): Promise<number> =>
  authRequest<number>(`${ACCOUNTS_ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteAccounts = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(ACCOUNTS_ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
