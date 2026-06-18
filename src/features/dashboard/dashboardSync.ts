import { type EntitySync, type SyncContext } from "#features/sync"
import { type Manager } from "#shared/data"

import { type DashboardCard } from "./cards/DashboardCard"
import {
  createDashboardCard,
  deleteDashboardCards,
  fetchDashboardCards,
  updateDashboardCard,
  type DashboardCardPayload,
} from "./data/dashboardConfigClient"
import { type RemoteIdResolver } from "./types"
import { remapCardConfigIds } from "./utils"

// Index of remoteId → local id for an entity store, used to translate a pulled
// card's config (which holds backend ids) into the local ids the card resolves
// against. Rows without a remoteId (guest-created, not yet pushed) are skipped.
const buildRemoteIndex = (
  items: ReadonlyArray<{ id: number; remoteId?: number }>,
): RemoteIdResolver => {
  const map = new Map<number, number>()
  for (const item of items) {
    if (typeof item.remoteId === "number") map.set(item.remoteId, item.id)
  }
  return (remoteId) => map.get(remoteId)
}

// Sync adapter for dashboard cards (the user's grid layout, persisted backend
// as /user-dashboard-config). `type` is already the backend ordinal; `config`
// is the opaque JSON string, kept wire-compatible with the web wallet. The pull
// must run AFTER accounts and categories sync: a card's config snapshots them by
// backend id, which is remapped to the local id here (see remapCardConfigIds).
export const dashboardSync = (
  manager: Manager,
): EntitySync<DashboardCard, DashboardCardPayload> => {
  const client = manager.Dashboard

  return {
    label: "dashboard",
    pull: async () => {
      const rows = await fetchDashboardCards()
      const resolveAccountId = buildRemoteIndex(manager.Accounts.getAll())
      const resolveCategoryId = buildRemoteIndex(manager.Categories.getAll())
      const remapped = rows.map((row) => ({
        ...row,
        config: remapCardConfigIds(
          row.config,
          resolveAccountId,
          resolveCategoryId,
        ),
      }))
      client.mergeRemote(remapped)
    },
    list: () => client.getAll(),
    attachRemoteId: client.attachRemoteId,
    toPayload: (card, { userId }: SyncContext) => ({
      type: card.type,
      title: card.title,
      config: card.config,
      position: card.position,
      userId,
    }),
    fields: (card) => ({
      type: card.type,
      title: card.title ?? "",
      config: card.config ?? "",
      position: card.position,
    }),
    create: createDashboardCard,
    update: updateDashboardCard,
    remove: deleteDashboardCards,
  }
}
