export const TRANSACTION_FIELD_LIMITS = {
  DESCRIPTION: 60,
} as const

// Matches the "YYYY/MM/DD HH:mm" format used across the app (see todayStamp).
// The time component keeps same-day transactions correctly ordered.
export const DATE_PATTERN = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
