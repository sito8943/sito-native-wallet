import {
  DEFAULT_LAST_TRANSACTIONS_CONFIG,
  DEFAULT_LAST_TRANSACTIONS_LIMIT,
  LAST_TRANSACTIONS_LIMITS,
  type LastTransactionsConfig,
} from "../DashboardCard"

const MIN_LIMIT = LAST_TRANSACTIONS_LIMITS[0]
const MAX_LIMIT = LAST_TRANSACTIONS_LIMITS[LAST_TRANSACTIONS_LIMITS.length - 1]

// Keep the persisted limit inside the supported range so a hand-edited or
// future-wider config still renders sensibly.
const clampLimit = (value: unknown): number => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return DEFAULT_LAST_TRANSACTIONS_LIMIT
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, Math.round(parsed)))
}

export const parseConfig = (raw: string | null): LastTransactionsConfig => {
  try {
    // Spread the default so configs persisted before a field existed still
    // resolve to a complete shape (mirrors BalanceHistoryCard's parseConfig).
    const merged = raw
      ? {
          ...DEFAULT_LAST_TRANSACTIONS_CONFIG,
          ...(JSON.parse(raw) as LastTransactionsConfig),
        }
      : DEFAULT_LAST_TRANSACTIONS_CONFIG
    return {
      ...merged,
      categoryIds: merged.categoryIds ?? [],
      limit: clampLimit(merged.limit),
    }
  } catch {
    return DEFAULT_LAST_TRANSACTIONS_CONFIG
  }
}
