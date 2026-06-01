export const ACCOUNT_TYPE = {
  CASH: "cash",
  DIGITAL: "digital",
} as const

// Human-readable labels for selectors and cards.
export const ACCOUNT_TYPE_LABEL = {
  [ACCOUNT_TYPE.CASH]: "Cash",
  [ACCOUNT_TYPE.DIGITAL]: "Digital",
} as const
