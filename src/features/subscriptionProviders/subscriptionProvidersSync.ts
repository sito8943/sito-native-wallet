import { type EntitySync, type SyncContext } from "#features/sync"
import { type Manager } from "#shared/data"

import {
  RemoteSubscriptionProviderClient,
  type SubscriptionProviderPayload,
} from "./clients/RemoteSubscriptionProviderClient"
import { type SubscriptionProvider } from "./SubscriptionProvider"

// Sync adapter for subscription providers — a standalone entity (no foreign
// keys), so its order in the orchestrator is free. `photo` isn't synced (the
// backend takes it as a separate multipart upload).
export const subscriptionProvidersSync = (
  manager: Manager,
): EntitySync<SubscriptionProvider, SubscriptionProviderPayload> => {
  const client = manager.SubscriptionProviders

  return {
    label: "subscriptionProviders",
    pull: async () => {
      const rows = await RemoteSubscriptionProviderClient.fetch()
      client.mergeRemote(rows)
    },
    list: () => client.getAll(),
    attachRemoteId: client.attachRemoteId,
    toPayload: (provider, { userId }: SyncContext) =>
      provider.name.trim() === ""
        ? null
        : {
            name: provider.name.trim(),
            description: provider.description,
            website: provider.website,
            userId,
          },
    fields: (provider) => ({
      name: provider.name,
      description: provider.description ?? "",
      website: provider.website ?? "",
    }),
    create: RemoteSubscriptionProviderClient.create,
    update: RemoteSubscriptionProviderClient.update,
    remove: RemoteSubscriptionProviderClient.remove,
  }
}
