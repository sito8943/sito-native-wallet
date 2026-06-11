import { type TransactionType } from "#features/categories/TransactionCategory"
import { type CommonAccountDto } from "#features/transactions/dtos"
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

// Config shapes store the account as a CommonAccountDto snapshot (keyed
// `account`/`accounts`), matching the web wallet's persisted config so it stays
// wire-compatible with the backend. Cards still resolve the live account by
// `account.id` for the current balance/currency.

// null account → the single account the user must pick (no "all" total, since
// summing across currencies is meaningless).
export type CurrentBalanceConfig = {
  account: CommonAccountDto | null
}

// null account → every account.
export type TypeResumeConfig = {
  account: CommonAccountDto | null
  type: TransactionType
  time: TypeResumeTime
}
