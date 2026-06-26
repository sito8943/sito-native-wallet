import { type EntitySync, type SyncContext } from "#features/sync"
import { type Manager } from "#shared/data"

import {
  RemoteCategoryClient,
  type CategoryPayload,
} from "./clients/RemoteCategoryClient"
import { type TransactionCategory } from "./TransactionCategory"

// Sync adapter for transaction categories. System categories (balance
// adjustments) are seeded infrastructure, not user data, so they never sync.
export const categoriesSync = (
  manager: Manager,
): EntitySync<TransactionCategory, CategoryPayload> => {
  const client = manager.Categories

  return {
    label: "categories",
    pull: async () => {
      const rows = await RemoteCategoryClient.fetch()
      client.mergeRemote(rows)
    },
    list: () => client.getAll().filter((category) => category.system !== true),
    attachRemoteId: client.attachRemoteId,
    toPayload: (category, { userId }: SyncContext) =>
      category.name.trim() === ""
        ? null
        : {
            name: category.name.trim(),
            description: category.description,
            color: category.color,
            type: category.type,
            userId,
          },
    fields: (category) => ({
      name: category.name,
      description: category.description ?? "",
      color: category.color,
      type: category.type,
    }),
    create: RemoteCategoryClient.create,
    update: RemoteCategoryClient.update,
    remove: RemoteCategoryClient.remove,
  }
}
