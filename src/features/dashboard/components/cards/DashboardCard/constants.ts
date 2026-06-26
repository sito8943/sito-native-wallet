// Deep path on purpose: this file is pulled in (via demoData → DashboardClient
// → Manager) while the #features/categories barrel is still initializing, so
// importing the barrel here would read TRANSACTION_TYPE before it's defined.
import { TRANSACTION_TYPE } from "#features/categories/TransactionCategory"

import {
  type BalanceHistoryConfig,
  type CurrentBalanceConfig,
  type LastTransactionsConfig,
  type TypeResumeConfig,
} from "./types"

// Card kinds the wallet can show. Values mirror the web wallet's
// DashboardCardType enum (WeeklySpent = 1 is deprecated and SubscriptionForecast
// = 3 needs a Subscriptions entity SitoWallet doesn't have yet — both omitted).
// Gaps in the values are kept so the persisted config stays wire-compatible.
export const DASHBOARD_CARD_TYPE = {
  TYPE_RESUME: 0,
  CURRENT_BALANCE: 2,
  BALANCE_HISTORY: 4,
  LAST_TRANSACTIONS: 5,
} as const

// Bounds for the LastTransactions card's row count.
export const LAST_TRANSACTIONS_LIMITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
export const DEFAULT_LAST_TRANSACTIONS_LIMIT = 4

// Time window for the BalanceHistory chart. Each preset maps to a set of date
// boundaries (see getBalanceHistoryBoundaries). String values are SitoWallet's
// own — there's no backend balance-history endpoint to stay compatible with.
export const BALANCE_HISTORY_PRESET = {
  LAST_7_DAYS: "last7Days",
  LAST_30_DAYS: "last30Days",
  LAST_90_DAYS: "last90Days",
  LAST_12_MONTHS: "last12Months",
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
  showFiltersAsBadge: false,
}

export const DEFAULT_TYPE_RESUME_CONFIG: TypeResumeConfig = {
  account: null,
  type: TRANSACTION_TYPE.INCOME,
  time: TYPE_RESUME_TIME.CURRENT_MONTH,
  excludedCategoryIds: [],
  showOppositeType: false,
  oppositeExcludedCategoryIds: [],
  showFiltersAsBadge: false,
}

// No account selected → the card asks the user to pick one (like CurrentBalance,
// a single account's series — no cross-currency aggregate).
export const DEFAULT_BALANCE_HISTORY_CONFIG: BalanceHistoryConfig = {
  account: null,
  preset: BALANCE_HISTORY_PRESET.LAST_30_DAYS,
  showFiltersAsBadge: false,
}

// null account → every account; empty categories → every category. `limit`
// caps how many rows show (default 4, the last rendered at half opacity).
export const DEFAULT_LAST_TRANSACTIONS_CONFIG: LastTransactionsConfig = {
  account: null,
  categoryIds: [],
  limit: DEFAULT_LAST_TRANSACTIONS_LIMIT,
  showFiltersAsBadge: false,
}
