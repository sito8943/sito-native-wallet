import { type TransactionType } from "#features/categories/TransactionCategory"
import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
} from "#features/transactions/dtos"
import { type Timestamps } from "#shared/data/storage"

import {
  type BALANCE_HISTORY_PRESET,
  type DASHBOARD_CARD_TYPE,
  type TYPE_RESUME_TIME,
} from "./constants"

export type DashboardCardType =
  (typeof DASHBOARD_CARD_TYPE)[keyof typeof DASHBOARD_CARD_TYPE]

export type TypeResumeTime =
  (typeof TYPE_RESUME_TIME)[keyof typeof TYPE_RESUME_TIME]

export type BalanceHistoryPreset =
  (typeof BALANCE_HISTORY_PRESET)[keyof typeof BALANCE_HISTORY_PRESET]

// Stored dashboard card. `config` is a JSON string of the card-specific config
// (kept opaque here so the store stays generic, exactly like the web wallet's
// DashboardDto.config). `position` orders the grid.
export type DashboardCard = Partial<Timestamps> & {
  id: number
  // Backend id once this card has been synced (the local `id` is a
  // client-generated number that never matches the backend's). Absent for
  // guest-created cards not yet pushed. Addresses PATCH/DELETE and reconciles
  // pulled rows against local ones.
  remoteId?: number
  type: DashboardCardType
  title: string | null
  config: string | null
  position: number
}

// Config shapes store the account as a CommonAccountDto snapshot (keyed
// `account`/`accounts`), matching the web wallet's persisted config so it stays
// wire-compatible with the backend. Cards still resolve the live account by
// `account.id` for the current balance/currency.

// Display options shared by every card (the web wallet's base card config).
// Cards spread their default over the persisted config so older configs without
// these fields still resolve to a complete shape.
export type BaseCardConfig = {
  // Whether the active-filter chips render in the card header.
  showFiltersAsBadge: boolean
}

// null account → the single account the user must pick (no "all" total, since
// summing across currencies is meaningless).
export type CurrentBalanceConfig = BaseCardConfig & {
  account: CommonAccountDto | null
}

// null account → every account. `excludeCategories` drops transactions in those
// categories from the total (snapshots, like `account`; resolved by id).
export type TypeResumeConfig = BaseCardConfig & {
  account: CommonAccountDto | null
  type: TransactionType
  time: TypeResumeTime
  excludeCategories: CommonTransactionCategoryDto[]
  // Also show the opposite type's total (an income card shows expense too, and
  // vice-versa), mirroring the web wallet's "show opposite type".
  showOppositeType: boolean
  // Categories dropped from the opposite-type total. Only meaningful while
  // `showOppositeType` is on; cleared when it's turned off.
  oppositeExcludeCategories: CommonTransactionCategoryDto[]
}

// null account → the single account the user must pick (the chart plots one
// account's balance over the `preset` window).
export type BalanceHistoryConfig = BaseCardConfig & {
  account: CommonAccountDto | null
  preset: BalanceHistoryPreset
}
