import { authRequest } from "#features/auth"

import { CURRENCIES_ENDPOINT, CURRENCIES_PULL_PAGE_SIZE } from "./constants"
import {
  type CurrenciesPageResponse,
  type CurrencyPayload,
  type RemoteCurrency,
} from "./types"

export const fetchCurrencies = async (): Promise<RemoteCurrency[]> => {
  const page = await authRequest<CurrenciesPageResponse>(
    `${CURRENCIES_ENDPOINT}?page=0&pageSize=${CURRENCIES_PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createCurrency = (body: CurrencyPayload): Promise<number> =>
  authRequest<number>(CURRENCIES_ENDPOINT, { method: "POST", body, auth: true })

export const updateCurrency = (
  remoteId: number,
  body: CurrencyPayload,
): Promise<number> =>
  authRequest<number>(`${CURRENCIES_ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteCurrencies = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(CURRENCIES_ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
