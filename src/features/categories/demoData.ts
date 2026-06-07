import {
  ADJUSTMENT_CATEGORY_ID,
  TRANSACTION_TYPE,
  type TransactionCategory,
} from "./TransactionCategory"

// System categories backing balance adjustments. Seeded, hidden from the
// category list and the transaction picker, and used by sign of the delta.
// These are NOT demo data — the local backend needs them to record auto
// balance adjustments, so they are always seeded (find-or-created if missing).
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

export const ADJUSTMENT_CATEGORIES: TransactionCategory[] = [
  adjustmentIncome,
  adjustmentExpense,
]

// No demo seed beyond the system adjustment categories: regular categories
// start empty and are added from the category prefab picker (or manually).
export const INITIAL_CATEGORIES: TransactionCategory[] = [
  ...ADJUSTMENT_CATEGORIES,
]
