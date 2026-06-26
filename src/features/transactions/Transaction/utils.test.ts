import { TRANSACTION_TYPE, type TransactionType } from "#features/categories"

import { type Transaction } from "./types"
import { matchesTransactionFilter } from "./utils"

const make = (
  amount: number,
  date: string,
  type: TransactionType,
  accountId = 1,
): Transaction => ({
  id: amount,
  description: "x",
  amount,
  date,
  account: { id: accountId, name: "A", currencySymbol: "€" },
  categories: [{ id: 1, name: "c", color: "#000000", type }],
})

// The predicate that powers TransactionClient.list / .total — joined fields
// (type via category, account, day-granular date range).
describe("Transactions > matchesTransactionFilter", () => {
  const data = [
    make(10, "2026/06/05 09:00", TRANSACTION_TYPE.EXPENSE),
    make(20, "2026/06/12 09:00", TRANSACTION_TYPE.EXPENSE),
    make(99, "2026/06/12 09:00", TRANSACTION_TYPE.INCOME),
    make(5, "2026/05/30 09:00", TRANSACTION_TYPE.EXPENSE),
    make(7, "2026/06/12 09:00", TRANSACTION_TYPE.EXPENSE, 2),
  ]

  const sum = (predicate: (t: Transaction) => boolean): number =>
    data.filter(predicate).reduce((total, t) => total + t.amount, 0)

  it("filters by type and a day-granular date range", () => {
    const total = sum(
      matchesTransactionFilter({
        type: TRANSACTION_TYPE.EXPENSE,
        date: { start: "2026/06/01", end: "2026/06/30" },
      }),
    )
    // 10 + 20 + 7; excludes income 99 and the May 5.
    expect(total).toBe(37)
  })

  it("scopes to a single account", () => {
    const total = sum(
      matchesTransactionFilter({
        type: TRANSACTION_TYPE.EXPENSE,
        accountId: 1,
        date: { start: "2026/06/01", end: "2026/06/30" },
      }),
    )
    // excludes the account-2 expense (7)
    expect(total).toBe(30)
  })

  it("includes a same-day-as-end row despite its time component", () => {
    const total = sum(
      matchesTransactionFilter({
        type: TRANSACTION_TYPE.EXPENSE,
        date: { start: "2026/06/12", end: "2026/06/12" },
      }),
    )
    // 20 + 7 (both on the 12th, times ignored)
    expect(total).toBe(27)
  })

  it("drops transactions whose category is excluded", () => {
    const withCategory = (id: number, amount: number): Transaction => ({
      id: amount,
      description: "x",
      amount,
      date: "2026/06/12 09:00",
      account: { id: 1, name: "A", currencySymbol: "€" },
      categories: [
        { id, name: "c", color: "#000000", type: TRANSACTION_TYPE.EXPENSE },
      ],
    })
    const rows = [withCategory(1, 10), withCategory(2, 20), withCategory(3, 30)]

    const total = rows
      .filter(matchesTransactionFilter({ excludeCategory: [2, 3] }))
      .reduce((acc, t) => acc + t.amount, 0)

    // only category 1 survives
    expect(total).toBe(10)
  })

  it("matches the backend TypeResume rule for automatic transactions", () => {
    const expenseCategory: Transaction["categories"][number] = {
      id: 1,
      name: "Expense",
      color: "#000000",
      type: TRANSACTION_TYPE.EXPENSE,
    }
    const autoCategory: Transaction["categories"][number] = {
      ...expenseCategory,
      id: 2,
      name: "Auto",
      auto: true,
    }
    const transaction = (
      id: number,
      amount: number,
      auto: boolean,
      categories: Transaction["categories"],
    ): Transaction => ({
      id,
      description: "x",
      amount,
      date: "2026/06/12 09:00",
      account: { id: 1, name: "A", currencySymbol: "€" },
      categories,
      auto,
    })
    const rows = [
      transaction(1, 304.85, false, [expenseCategory]),
      // Pulled backend adjustment: its auto category was intentionally not
      // synchronized, so the resolved transaction has no categories.
      transaction(2, 1071.75, true, []),
      transaction(3, 25, true, [autoCategory]),
    ]

    const total = rows
      .filter(
        matchesTransactionFilter({
          type: TRANSACTION_TYPE.EXPENSE,
          manualOrWithAnyManualCategory: true,
        }),
      )
      .reduce((acc, item) => acc + item.amount, 0)

    // The category-less adjustment and auto-only transaction match neither the
    // backend TypeResume scope nor its type join.
    expect(total).toBeCloseTo(304.85)
  })

  it("includes an automatic transaction carrying a manual category", () => {
    const automatic: Transaction = {
      id: 1,
      description: "Generated from a manual category",
      amount: 10,
      date: "2026/06/12 09:00",
      account: { id: 1, name: "A", currencySymbol: "€" },
      categories: [
        {
          id: 1,
          name: "Expense",
          color: "#000000",
          type: TRANSACTION_TYPE.EXPENSE,
        },
      ],
      auto: true,
    }

    expect(
      matchesTransactionFilter({
        type: TRANSACTION_TYPE.EXPENSE,
        manualOrWithAnyManualCategory: true,
      })(automatic),
    ).toBe(true)
  })

  it("keeps automatic transactions in ordinary transaction filters", () => {
    const automatic: Transaction = {
      id: 1,
      description: "Adjustment",
      amount: 1071.75,
      date: "2026/06/12 09:00",
      account: { id: 1, name: "A", currencySymbol: "€" },
      categories: [],
      auto: true,
    }

    expect(
      matchesTransactionFilter({ type: TRANSACTION_TYPE.EXPENSE })(automatic),
    ).toBe(true)
  })
})
