import { type Account } from "#features/accounts"
import { type TransactionCategory } from "#features/categories"
// Deep path on purpose: the categories barrel pulls in hooks → Manager, risking
// an eval-time cycle when this module is loaded during the sync pull.
import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "#features/categories/TransactionCategory"
import {
  type CommonAccountDto,
  type CommonTransactionCategoryDto,
} from "#features/transactions/dtos"

import {
  BALANCE_HISTORY_PRESET,
  TYPE_RESUME_TIME,
  type BalanceHistoryPreset,
  type TypeResumeTime,
} from "./components/cards/DashboardCard"
import { type DateRange, type RemoteIdResolver } from "./types"

// Snapshot stored in a card's config (matches the web wallet's persisted
// account shape). Cards resolve the live account by `id` for the actual value.
export const toAccountSnapshot = (account: Account): CommonAccountDto => ({
  id: account.id,
  name: account.name,
  currencySymbol: account.currency.symbol,
})

// Snapshot stored in a card's config; cards resolve the live category by `id`.
export const toCategorySnapshot = (
  category: TransactionCategory,
): CommonTransactionCategoryDto => ({
  id: category.id,
  name: category.name,
  description: category.description,
  color: category.color,
  type: category.type,
})

// A pulled card's `config` snapshots reference accounts/categories by their
// BACKEND id, but the cards resolve the live row by LOCAL id (the two never
// match — see Account.remoteId). Rewrite those ids to local ones so the card
// fills its value; without this, pulled cards render empty (account → null,
// total → 0). Locally-created cards already store local ids, so this only runs
// on the merge of remote rows. Unresolved refs are dropped (account → null,
// excluded category removed) rather than left pointing at a foreign id.
export const remapCardConfigIds = (
  config: string | null | undefined,
  resolveAccountId: RemoteIdResolver,
  resolveCategoryId: RemoteIdResolver,
): string | null | undefined => {
  if (!config) return config

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(config) as Record<string, unknown>
  } catch {
    return config
  }
  if (typeof parsed !== "object" || parsed === null) return config

  const next: Record<string, unknown> = { ...parsed }

  const account = next.account as { id?: number } | null | undefined
  if (account && typeof account.id === "number") {
    const localId = resolveAccountId(account.id)
    next.account = localId === undefined ? null : { ...account, id: localId }
  }

  // Remap every category-snapshot list (primary + opposite excludes), dropping
  // refs that don't resolve to a local category.
  const remapCategories = (raw: unknown): unknown =>
    Array.isArray(raw)
      ? raw
          .map((entry) => {
            const category = entry as { id?: number } | null
            if (!category || typeof category.id !== "number") return null
            const localId = resolveCategoryId(category.id)
            return localId === undefined ? null : { ...category, id: localId }
          })
          .filter((category): category is { id: number } => category !== null)
      : raw

  if (next.excludeCategories !== undefined) {
    next.excludeCategories = remapCategories(next.excludeCategories)
  }
  if (next.oppositeExcludeCategories !== undefined) {
    next.oppositeExcludeCategories = remapCategories(
      next.oppositeExcludeCategories,
    )
  }

  return JSON.stringify(next)
}

// The transaction type opposite the given one (income ↔ expense). Used by the
// TypeResume card's "show opposite type" total.
export const getOppositeType = (type: TransactionType): TransactionType =>
  type === TRANSACTION_TYPE.INCOME
    ? TRANSACTION_TYPE.EXPENSE
    : TRANSACTION_TYPE.INCOME

const pad = (value: number): string => `${value}`.padStart(2, "0")

const ymd = (date: Date): string =>
  `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`

// Current week, Sunday→Saturday, as YYYY/MM/DD strings (the app's stored date
// format), so they compare lexicographically against transaction.date.
export const getCurrentWeekRange = (
  today = new Date(),
): Required<DateRange> => {
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return { start: ymd(start), end: ymd(end) }
}

// Range for a TypeResume time window, as YYYY/MM/DD bounds.
export const getTimeRange = (
  time: TypeResumeTime,
  today = new Date(),
): DateRange => {
  const year = today.getFullYear()
  const month = today.getMonth()

  switch (time) {
    case TYPE_RESUME_TIME.CURRENT_DAY: {
      const day = ymd(today)
      return { start: day, end: day }
    }
    case TYPE_RESUME_TIME.CURRENT_WEEK:
      return getCurrentWeekRange(today)
    case TYPE_RESUME_TIME.CURRENT_MONTH:
      return {
        start: `${year}/${pad(month + 1)}/01`,
        // Day 0 of next month = last day of this month.
        end: `${year}/${pad(month + 1)}/${pad(new Date(year, month + 1, 0).getDate())}`,
      }
    case TYPE_RESUME_TIME.CURRENT_YEAR:
      return { start: `${year}/01/01`, end: `${year}/12/31` }
    default:
      return {}
  }
}

// Ascending YYYY/MM/DD boundary dates for a balance-history preset — the points
// the chart plots the account balance at. Daily for the short windows, weekly
// for 90 days, end-of-month for the year, to keep the point count readable.
export const getBalanceHistoryBoundaries = (
  preset: BalanceHistoryPreset,
  today = new Date(),
): string[] => {
  const dates: Date[] = []
  const dayBack = (days: number): Date => {
    const date = new Date(today)
    date.setDate(today.getDate() - days)
    return date
  }

  switch (preset) {
    case BALANCE_HISTORY_PRESET.LAST_7_DAYS:
      for (let i = 6; i >= 0; i -= 1) dates.push(dayBack(i))
      break
    case BALANCE_HISTORY_PRESET.LAST_30_DAYS:
      // Every ~3 days → ~11 points, enough to show the trend without crowding.
      for (let i = 30; i >= 0; i -= 3) dates.push(dayBack(i))
      break
    case BALANCE_HISTORY_PRESET.LAST_90_DAYS:
      for (let i = 12; i >= 0; i -= 1) dates.push(dayBack(i * 7))
      break
    case BALANCE_HISTORY_PRESET.LAST_12_MONTHS:
      for (let i = 11; i >= 0; i -= 1) {
        // Day 0 of the next month = last day of that month, i months back.
        dates.push(new Date(today.getFullYear(), today.getMonth() - i + 1, 0))
      }
      break
    default:
      break
  }

  return dates.map(ymd)
}

// "1234.50 €" — amount with two decimals plus the currency symbol (trimmed when
// there's no symbol). Mirrors how TransactionCard renders amounts.
export const formatAmount = (value: number, symbol: string): string =>
  `${value.toFixed(2)} ${symbol}`.trim()
