// Deep path on purpose: this file is pulled in (via demoData → DashboardClient
// → Manager) while the #features/categories barrel is still initializing, so
// importing the barrel here would read TRANSACTION_TYPE before it's defined.
import { TRANSACTION_TYPE } from "#features/categories/TransactionCategory"

import { type CurrentBalanceConfig, type TypeResumeConfig } from "./types"

// Card kinds the wallet can show. Values mirror the web wallet's
// DashboardCardType enum (WeeklySpent = 1 and SubscriptionForecast = 3 are
// intentionally omitted — SitoWallet doesn't port those cards). Gaps in the
// values are kept so the persisted config stays wire-compatible.
export const DASHBOARD_CARD_TYPE = {
  TYPE_RESUME: 0,
  CURRENT_BALANCE: 2,
} as const

// Time window for the TypeResume total. String values mirror the web wallet's
// TransactionTypeResumeTime enum so the persisted config stays compatible with
// the backend contract for a future API swap.
export const TYPE_RESUME_TIME = {
  CURRENT_DAY: "currentDay",
  CURRENT_WEEK: "currentWeek",
  CURRENT_MONTH: "currentMonth",
  CURRENT_YEAR: "currentYear",
} as const

// No account selected → the card asks the user to pick one.
export const DEFAULT_CURRENT_BALANCE_CONFIG: CurrentBalanceConfig = {
  account: null,
}

export const DEFAULT_TYPE_RESUME_CONFIG: TypeResumeConfig = {
  account: null,
  type: TRANSACTION_TYPE.INCOME,
  time: TYPE_RESUME_TIME.CURRENT_MONTH,
}
