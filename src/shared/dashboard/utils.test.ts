import { TRANSACTION_TYPE, type TransactionType } from "#shared/categories"
import { type Transaction } from "#shared/transactions"

import { TYPE_RESUME_TIME } from "./DashboardCard"
import {
  formatAmount,
  getCurrentWeekRange,
  getTimeRange,
  sumTransactions,
} from "./utils"

const make = (
  amount: number,
  date: string,
  type: TransactionType,
  accountId = 1,
): Transaction => ({
  id: 1,
  description: "x",
  amount,
  date,
  account: { id: accountId, name: "A", currencySymbol: "€" },
  categories: [{ id: 1, name: "c", color: "#000000", type }],
})

describe("Dashboard > utils", () => {
  describe("sumTransactions", () => {
    const data = [
      make(10, "2026/06/05", TRANSACTION_TYPE.EXPENSE),
      make(20, "2026/06/12", TRANSACTION_TYPE.EXPENSE),
      make(99, "2026/06/12", TRANSACTION_TYPE.INCOME),
      make(5, "2026/05/30", TRANSACTION_TYPE.EXPENSE),
      make(7, "2026/06/12", TRANSACTION_TYPE.EXPENSE, 2),
    ]

    it("sums amounts matching type and date range", () => {
      expect(
        sumTransactions(data, {
          type: TRANSACTION_TYPE.EXPENSE,
          start: "2026/06/01",
          end: "2026/06/30",
        }),
      ).toBe(37) // 10 + 20 + 7 (excludes income 99 and May 5)
    })

    it("scopes to one account when accountId is set", () => {
      expect(
        sumTransactions(data, {
          type: TRANSACTION_TYPE.EXPENSE,
          accountId: 1,
          start: "2026/06/01",
          end: "2026/06/30",
        }),
      ).toBe(30) // excludes the account-2 expense
    })

    it("returns 0 when nothing matches", () => {
      expect(sumTransactions([], { type: TRANSACTION_TYPE.INCOME })).toBe(0)
    })
  })

  describe("getTimeRange", () => {
    const june = new Date(2026, 5, 15)

    it("bounds the current month", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.MONTH, june)).toEqual({
        start: "2026/06/01",
        end: "2026/06/30",
      })
    })

    it("bounds the current year", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.YEAR, june)).toEqual({
        start: "2026/01/01",
        end: "2026/12/31",
      })
    })

    it("is unbounded for all time", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.ALL, june)).toEqual({})
    })
  })

  describe("getCurrentWeekRange", () => {
    it("spans Sunday to Saturday", () => {
      // 2026/06/15 is a Monday; the week runs 14th (Sun) → 20th (Sat).
      expect(getCurrentWeekRange(new Date(2026, 5, 15))).toEqual({
        start: "2026/06/14",
        end: "2026/06/20",
      })
    })
  })

  describe("formatAmount", () => {
    it("formats with two decimals and the symbol", () => {
      expect(formatAmount(1234.5, "€")).toBe("1234.50 €")
    })

    it("trims when there is no symbol", () => {
      expect(formatAmount(10, "")).toBe("10.00")
    })
  })
})
