export const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
} as const

// Stable ids of the seeded system categories used for balance adjustments.
// Picked by sign of the delta when adjusting an account balance.
export const ADJUSTMENT_CATEGORY_ID = {
  INCOME: "adjustment-income",
  EXPENSE: "adjustment-expense",
} as const
