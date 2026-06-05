import { type Account } from "#shared/accounts"
import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "#shared/categories/TransactionCategory"
import { type Transaction } from "#shared/transactions"
import { type CommonAccountDto } from "#shared/transactions/dtos"

import { TYPE_RESUME_TIME, type TypeResumeTime } from "./DashboardCard"
import { type DateRange, type SumFilter } from "./types"

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

// A transaction's type comes from its (first) category, falling back to expense
// — same rule as the transactions module's getTransactionType.
const resolveTransactionType = (transaction: Transaction): TransactionType =>
  transaction.categories[0]?.type ?? TRANSACTION_TYPE.EXPENSE

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

// Sums transaction amounts matching type + optional account + optional date
// range. Date comparison is plain string comparison (safe for fixed-width
// YYYY/MM/DD).
export const sumTransactions = (
  transactions: Transaction[],
  { type, accountIds, start, end }: SumFilter,
): number =>
  transactions
    .filter((transaction) => {
      if (resolveTransactionType(transaction) !== type) return false
      if (
        accountIds !== undefined &&
        accountIds.length > 0 &&
        !accountIds.includes(transaction.account.id)
      )
        return false
      if (start !== undefined && transaction.date < start) return false
      if (end !== undefined && transaction.date > end) return false
      return true
    })
    .reduce((total, transaction) => total + transaction.amount, 0)

// "1234.50 €" — amount with two decimals plus the currency symbol (trimmed when
// there's no symbol). Mirrors how TransactionCard renders amounts.
export const formatAmount = (value: number, symbol: string): string =>
  `${value.toFixed(2)} ${symbol}`.trim()
