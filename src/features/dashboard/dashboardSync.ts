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

// Sync adapter for dashboard cards (the user's grid layout, persisted backend
// as /user-dashboard-config). Independent of the other entities (a card holds
// no FK to them — its config snapshots are display-only), so its order in the
// orchestrator is free. `type` is already the backend ordinal; `config` is the
// opaque JSON string, kept wire-compatible with the web wallet.
export const dashboardSync = (
  manager: Manager,
): EntitySync<DashboardCard, DashboardCardPayload> => {
  const client = manager.Dashboard

  return {
    label: "dashboard",
    pull: async () => {
      const rows = await fetchDashboardCards()
      client.mergeRemote(rows)
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
