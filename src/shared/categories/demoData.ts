import {
  ADJUSTMENT_CATEGORY_ID,
  TRANSACTION_TYPE,
  type TransactionCategory,
} from "./TransactionCategory"

const salary: TransactionCategory = {
  id: "salary",
  name: "Salary",
  description: "Recurring income from work",
  color: "#2e7d32",
  type: TRANSACTION_TYPE.INCOME,
}

const food: TransactionCategory = {
  id: "food",
  name: "Food",
  description: "Groceries, restaurants and snacks",
  color: "#ef6c00",
  type: TRANSACTION_TYPE.EXPENSE,
}

const transport: TransactionCategory = {
  id: "transport",
  name: "Transport",
  description: "Trips, tickets and commuting",
  color: "#1565c0",
  type: TRANSACTION_TYPE.EXPENSE,
}

const home: TransactionCategory = {
  id: "home",
  name: "Home",
  description: "Rent, utilities and household costs",
  color: "#6a1b9a",
  type: TRANSACTION_TYPE.EXPENSE,
}

// System categories backing balance adjustments. Seeded, hidden from the
// category list and the transaction picker, and used by sign of the delta.
const adjustmentIncome: TransactionCategory = {
  id: ADJUSTMENT_CATEGORY_ID.INCOME,
  name: "Balance adjustment",
  description: "Automatic balance increase",
  color: "#607d8b",
  type: TRANSACTION_TYPE.INCOME,
  system: true,
  auto: true,
}

const adjustmentExpense: TransactionCategory = {
  id: ADJUSTMENT_CATEGORY_ID.EXPENSE,
  name: "Balance adjustment",
  description: "Automatic balance decrease",
  color: "#607d8b",
  type: TRANSACTION_TYPE.EXPENSE,
  system: true,
  auto: true,
}

// The system adjustment categories, also used for find-or-create (the local
// backend re-creates them if missing before recording an auto transaction).
export const ADJUSTMENT_CATEGORIES: TransactionCategory[] = [
  adjustmentIncome,
  adjustmentExpense,
]

export const INITIAL_CATEGORIES: TransactionCategory[] = [
  salary,
  food,
  transport,
  home,
  ...ADJUSTMENT_CATEGORIES,
]
