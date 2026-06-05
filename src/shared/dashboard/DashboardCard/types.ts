import { type TransactionType } from "#shared/categories/TransactionCategory"
import { type Timestamps } from "#shared/data/storage"

import { type DASHBOARD_CARD_TYPE, type TYPE_RESUME_TIME } from "./constants"

export type DashboardCardType =
  (typeof DASHBOARD_CARD_TYPE)[keyof typeof DASHBOARD_CARD_TYPE]

export type TypeResumeTime =
  (typeof TYPE_RESUME_TIME)[keyof typeof TYPE_RESUME_TIME]

// Stored dashboard card. `config` is a JSON string of the card-specific config
// (kept opaque here so the store stays generic, exactly like the web wallet's
// DashboardDto.config). `position` orders the grid.
export type DashboardCard = Partial<Timestamps> & {
  id: number
  type: DashboardCardType
  title: string | null
  config: string | null
  position: number
}

// account omitted → the single account the user must pick (no "all" total,
// since summing across currencies is meaningless).
export type CurrentBalanceConfig = {
  accountId?: number
}

// account omitted → every account; type filters income vs expense.
export type WeeklySpentConfig = {
  accountId?: number
  type: TransactionType
}

export type TypeResumeConfig = {
  accountId?: number
  type: TransactionType
  time: TypeResumeTime
}
