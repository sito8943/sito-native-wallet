import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "#shared/categories/TransactionCategory"
import { type Transaction } from "#shared/transactions"

import { TYPE_RESUME_TIME, type TypeResumeTime } from "./DashboardCard"
import { type SumFilter, type DateRange } from "./types"

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

// Range for a TypeResume time window. "all" → no bounds.
export const getTimeRange = (
  time: TypeResumeTime,
  today = new Date(),
): DateRange => {
  const year = today.getFullYear()
  const month = today.getMonth()

  switch (time) {
    case TYPE_RESUME_TIME.WEEK:
      return getCurrentWeekRange(today)
    case TYPE_RESUME_TIME.MONTH:
      return {
        start: `${year}/${pad(month + 1)}/01`,
        // Day 0 of next month = last day of this month.
        end: `${year}/${pad(month + 1)}/${pad(new Date(year, month + 1, 0).getDate())}`,
      }
    case TYPE_RESUME_TIME.YEAR:
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
  { type, accountId, start, end }: SumFilter,
): number =>
  transactions
    .filter((transaction) => {
      if (resolveTransactionType(transaction) !== type) return false
      if (accountId !== undefined && transaction.account.id !== accountId)
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
