import { BALANCE_HISTORY_PRESET, TYPE_RESUME_TIME } from "./cards/DashboardCard"
import {
  formatAmount,
  getBalanceHistoryBoundaries,
  getCurrentWeekRange,
  getTimeRange,
  remapCardConfigIds,
} from "./utils"

describe("Dashboard > utils", () => {
  describe("getTimeRange", () => {
    const june = new Date(2026, 5, 15)

    it("bounds a single day", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.CURRENT_DAY, june)).toEqual({
        start: "2026/06/15",
        end: "2026/06/15",
      })
    })

    it("bounds the current month", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.CURRENT_MONTH, june)).toEqual({
        start: "2026/06/01",
        end: "2026/06/30",
      })
    })

    it("bounds the current year", () => {
      expect(getTimeRange(TYPE_RESUME_TIME.CURRENT_YEAR, june)).toEqual({
        start: "2026/01/01",
        end: "2026/12/31",
      })
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

  describe("getBalanceHistoryBoundaries", () => {
    const june = new Date(2026, 5, 15)

    it("returns 7 ascending daily boundaries for last 7 days", () => {
      const boundaries = getBalanceHistoryBoundaries(
        BALANCE_HISTORY_PRESET.LAST_7_DAYS,
        june,
      )
      expect(boundaries).toHaveLength(7)
      expect(boundaries[0]).toBe("2026/06/09")
      expect(boundaries[6]).toBe("2026/06/15")
    })

    it("returns 12 end-of-month boundaries for last 12 months", () => {
      const boundaries = getBalanceHistoryBoundaries(
        BALANCE_HISTORY_PRESET.LAST_12_MONTHS,
        june,
      )
      expect(boundaries).toHaveLength(12)
      // 11 months before June 2026 = July 2025, last day.
      expect(boundaries[0]).toBe("2025/07/31")
      expect(boundaries[11]).toBe("2026/06/30")
    })

    it("steps weekly for last 90 days", () => {
      const boundaries = getBalanceHistoryBoundaries(
        BALANCE_HISTORY_PRESET.LAST_90_DAYS,
        june,
      )
      expect(boundaries).toHaveLength(13)
      expect(boundaries[12]).toBe("2026/06/15")
    })
  })

  describe("remapCardConfigIds", () => {
    // remote id 50 → local 1, remote 60 → local 2
    const account = (remoteId: number) => ({ 50: 1, 60: 2 })[remoteId]
    // remote category id 70 → local 3
    const category = (remoteId: number) => ({ 70: 3 })[remoteId]

    it("rewrites the account snapshot id from remote to local", () => {
      const config = JSON.stringify({ account: { id: 50, name: "Cash" } })
      expect(remapCardConfigIds(config, account, category)).toBe(
        JSON.stringify({ account: { id: 1, name: "Cash" } }),
      )
    })

    it("nulls an account that isn't synced locally", () => {
      const config = JSON.stringify({ account: { id: 999, name: "Gone" } })
      expect(remapCardConfigIds(config, account, category)).toBe(
        JSON.stringify({ account: null }),
      )
    })

    it("remaps excludeCategories and drops unresolved ones", () => {
      const config = JSON.stringify({
        account: { id: 60 },
        excludeCategories: [{ id: 70, name: "Rent" }, { id: 999, name: "X" }],
      })
      expect(remapCardConfigIds(config, account, category)).toBe(
        JSON.stringify({
          account: { id: 2 },
          excludeCategories: [{ id: 3, name: "Rent" }],
        }),
      )
    })

    it("passes null/empty config through untouched", () => {
      expect(remapCardConfigIds(null, account, category)).toBeNull()
      expect(remapCardConfigIds("", account, category)).toBe("")
    })

    it("returns malformed JSON unchanged", () => {
      expect(remapCardConfigIds("{not json", account, category)).toBe(
        "{not json",
      )
    })
  })
})
