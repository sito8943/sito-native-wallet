import { type QueryParam, type QueryResult } from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"

import { type DashboardCard } from "../DashboardCard"
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

  public list = (
    params: QueryParam<DashboardCard> = {},
  ): QueryResult<DashboardCard> => this.runQuery(params)
}
