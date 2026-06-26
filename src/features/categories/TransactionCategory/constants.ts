export const TRANSACTION_TYPE = {
  EXPENSE: 0,
  INCOME: 1,
} as const

// Stable ids of the seeded system categories used for balance adjustments.
// Picked by sign of the delta when adjusting an account balance.
export const ADJUSTMENT_CATEGORY_ID = {
  EXPENSE: 0,
  INCOME: 1,
} as const

export const TRANSFER_CATEGORY_ID = {
  OUT: 2,
  IN: 3,
} as const
