import { type QueryParam, type QueryResult } from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"

import {
  DASHBOARD_CARD_TYPE,
  type DashboardCard,
  type DashboardCardType,
} from "../../cards/DashboardCard"
import { type RemoteDashboardCard } from "../dashboardConfigClient"
import { INITIAL_DASHBOARD } from "../demoData"
import { type AddDashboardCardDto } from "../dtos"

import { DASHBOARD_ERROR_MESSAGE, DASHBOARD_STORAGE_KEY } from "./constants"
import { parseStoredDashboard } from "./utils"

// Reactive store for dashboard cards. Holds only card metadata (type, title,
// config, position) — each card computes its value from the live accounts /
// transactions clients, so this client has no dependency on the others.
export default class DashboardClient extends StorageClient<DashboardCard> {
  constructor() {
    super({
      storageKey: DASHBOARD_STORAGE_KEY,
      errorMessage: DASHBOARD_ERROR_MESSAGE,
      initialValue: INITIAL_DASHBOARD,
      parse: parseStoredDashboard,
    })
  }

  public add = (input: AddDashboardCardDto): void => {
    this.insert({ id: createId(), title: null, config: null, ...input })
  }

  public updateTitle = (id: number, title: string): void => {
    this.patch(id, { title })
  }

  public updateConfig = (id: number, config: string): void => {
    this.patch(id, { config })
  }

  // Rewrites each card's `position` to match the dropped order. Ids missing
  // from the list are left untouched.
  public reorder = (orderedIds: number[]): void => {
    this.mutate((items) =>
      items.map((item) => {
        const position = orderedIds.indexOf(item.id)
        return position === -1 ? item : { ...item, position }
      }),
    )
  }

  public list = (
    params: QueryParam<DashboardCard> = {},
  ): QueryResult<DashboardCard> => this.runQuery(params)

  // --- Backend sync bookkeeping ---------------------------------------------
  // `mutate` (not insert/patch) on purpose: records server state, not a user
  // edit, so it must not bump `updatedAt` or look like a local change.

  // Pull (insert-only): add backend cards we don't already track by remoteId.
  // A card whose `type` this build doesn't render (the web wallet has cards
  // SitoWallet doesn't port) is skipped — the grid can't show it.
  public mergeRemote = (remote: RemoteDashboardCard[]): void => {
    const supported = Object.values(DASHBOARD_CARD_TYPE) as number[]

    this.mutate((items) => {
      const known = new Set(
        items
          .map((card) => card.remoteId)
          .filter((id): id is number => id !== undefined),
      )

      const additions: DashboardCard[] = []
      for (const row of remote) {
        if (known.has(row.id) || !supported.includes(row.type)) {
          continue
        }
        additions.push({
          id: createId(),
          remoteId: row.id,
          type: row.type as DashboardCardType,
          title: row.title ?? null,
          config: row.config ?? null,
          position: row.position ?? additions.length,
        })
      }

      return additions.length === 0 ? items : [...items, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created card after its POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((card) => (card.id === localId ? { ...card, remoteId } : card)),
    )
  }
}
