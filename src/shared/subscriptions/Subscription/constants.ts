export const MS_PER_DAY = 1000 * 60 * 60 * 24

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  CANCELED: "CANCELED",
} as const

export const SUBSCRIPTION_BILLING_UNIT = {
  DAY: "DAY",
  MONTH: "MONTH",
  YEAR: "YEAR",
} as const
