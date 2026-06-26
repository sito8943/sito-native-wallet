import { authRequest } from "#features/auth"

import { CURRENCIES_ENDPOINT, CURRENCIES_PULL_PAGE_SIZE } from "./constants"
import {
  type CurrenciesPageResponse,
  type CurrencyPayload,
  type RemoteCurrency,
} from "./types"

// Remote (REST) currency backend — counterpart to LocalCurrencyClient. Used by
// currenciesSync to push/pull; the local client is what the app reads.
export const RemoteCurrencyClient = {
  fetch: async (): Promise<RemoteCurrency[]> => {
    const page = await authRequest<CurrenciesPageResponse>(
      `${CURRENCIES_ENDPOINT}?page=0&pageSize=${CURRENCIES_PULL_PAGE_SIZE}`,
      { auth: true },
    )
    return page.items ?? []
  },

  create: (body: CurrencyPayload): Promise<number> =>
    authRequest<number>(CURRENCIES_ENDPOINT, {
      method: "POST",
      body,
      auth: true,
    }),

  update: (remoteId: number, body: CurrencyPayload): Promise<number> =>
    authRequest<number>(`${CURRENCIES_ENDPOINT}/${remoteId}`, {
      method: "PATCH",
      body: { id: remoteId, ...body },
      auth: true,
    }),

  // The backend deletes a batch (soft-delete) addressed by a raw array of ids.
  remove: (remoteIds: number[]): Promise<number> =>
    authRequest<number>(CURRENCIES_ENDPOINT, {
      method: "DELETE",
      body: remoteIds,
      auth: true,
    }),
}
