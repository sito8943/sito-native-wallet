import {
  DEFAULT_BALANCE_HISTORY_CONFIG,
  type BalanceHistoryConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): BalanceHistoryConfig => {
  try {
    // Spread the default so configs persisted before a field existed still
    // resolve to a complete shape (mirrors TypeResumeCard's parseConfig).
    return raw
      ? {
          ...DEFAULT_BALANCE_HISTORY_CONFIG,
          ...(JSON.parse(raw) as BalanceHistoryConfig),
        }
      : DEFAULT_BALANCE_HISTORY_CONFIG
  } catch {
    return DEFAULT_BALANCE_HISTORY_CONFIG
  }
}
