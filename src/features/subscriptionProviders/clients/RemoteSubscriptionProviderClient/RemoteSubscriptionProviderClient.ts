import { authRequest } from "#features/auth"

import {
  SUBSCRIPTION_PROVIDERS_ENDPOINT,
  SUBSCRIPTION_PROVIDERS_PULL_PAGE_SIZE,
} from "./constants"
import {
  type SubscriptionProviderPayload,
  type SubscriptionProvidersPageResponse,
  type RemoteSubscriptionProvider,
} from "./types"

// Remote (REST) subscription-provider backend — counterpart to
// LocalSubscriptionProviderClient. Used by subscriptionProvidersSync to
// push/pull; the local client is what the app reads.
export const RemoteSubscriptionProviderClient = {
  fetch: async (): Promise<RemoteSubscriptionProvider[]> => {
    const page = await authRequest<SubscriptionProvidersPageResponse>(
      `${SUBSCRIPTION_PROVIDERS_ENDPOINT}?page=0&pageSize=${SUBSCRIPTION_PROVIDERS_PULL_PAGE_SIZE}`,
      { auth: true },
    )
    return page.items ?? []
  },

  create: (body: SubscriptionProviderPayload): Promise<number> =>
    authRequest<number>(SUBSCRIPTION_PROVIDERS_ENDPOINT, {
      method: "POST",
      body,
      auth: true,
    }),

  update: (
    remoteId: number,
    body: SubscriptionProviderPayload,
  ): Promise<number> =>
    authRequest<number>(`${SUBSCRIPTION_PROVIDERS_ENDPOINT}/${remoteId}`, {
      method: "PATCH",
      body: { id: remoteId, ...body },
      auth: true,
    }),

  // The backend deletes a batch (soft-delete) addressed by a raw array of ids.
  remove: (remoteIds: number[]): Promise<number> =>
    authRequest<number>(SUBSCRIPTION_PROVIDERS_ENDPOINT, {
      method: "DELETE",
      body: remoteIds,
      auth: true,
    }),
}
