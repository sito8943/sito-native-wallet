import { TYPE_RESUME_TIME } from "./cards/DashboardCard"
import { formatAmount, getCurrentWeekRange, getTimeRange } from "./utils"

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
})
