import { type Account } from "#features/accounts"
import { type CommonAccountDto } from "#features/transactions/dtos"

import { TYPE_RESUME_TIME, type TypeResumeTime } from "./DashboardCard"
import { type DateRange } from "./types"

// Snapshot stored in a card's config (matches the web wallet's persisted
// account shape). Cards resolve the live account by `id` for the actual value.
export const toAccountSnapshot = (account: Account): CommonAccountDto => ({
  id: account.id,
  name: account.name,
  currencySymbol: account.currency.symbol,
})

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

// "1234.50 €" — amount with two decimals plus the currency symbol (trimmed when
// there's no symbol). Mirrors how TransactionCard renders amounts.
export const formatAmount = (value: number, symbol: string): string =>
  `${value.toFixed(2)} ${symbol}`.trim()
