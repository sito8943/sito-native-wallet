// Deep path on purpose: this file is pulled in (via demoData → DashboardClient
// → Manager) while the #shared/categories barrel is still initializing, so
// importing the barrel here would read TRANSACTION_TYPE before it's defined.
import { TRANSACTION_TYPE } from "#shared/categories/TransactionCategory"

import {
  type CurrentBalanceConfig,
  type TypeResumeConfig,
  type WeeklySpentConfig,
} from "./types"

// Card kinds the wallet can show. Values mirror the web wallet's
// DashboardCardType enum (SubscriptionForecast = 3 is intentionally omitted —
// SitoWallet doesn't port the subscription card).
export const DASHBOARD_CARD_TYPE = {
  TYPE_RESUME: 0,
  WEEKLY_SPENT: 1,
  CURRENT_BALANCE: 2,
} as const

// Time window for the TypeResume total.
export const TYPE_RESUME_TIME = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
  ALL: "all",
} as const

// No account selected → the card asks the user to pick one.
export const DEFAULT_CURRENT_BALANCE_CONFIG: CurrentBalanceConfig = {}

export const DEFAULT_WEEKLY_SPENT_CONFIG: WeeklySpentConfig = {
  type: TRANSACTION_TYPE.EXPENSE,
}

export const DEFAULT_TYPE_RESUME_CONFIG: TypeResumeConfig = {
  type: TRANSACTION_TYPE.INCOME,
  time: TYPE_RESUME_TIME.MONTH,
}
