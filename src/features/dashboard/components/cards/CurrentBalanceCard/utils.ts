import {
  DEFAULT_CURRENT_BALANCE_CONFIG,
  type CurrentBalanceConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): CurrentBalanceConfig => {
  try {
    // Spread the default so configs persisted before a field existed (e.g.
    // showFiltersAsBadge) still resolve to a complete shape.
    return raw
      ? {
          ...DEFAULT_CURRENT_BALANCE_CONFIG,
          ...(JSON.parse(raw) as CurrentBalanceConfig),
        }
      : DEFAULT_CURRENT_BALANCE_CONFIG
  } catch {
    return DEFAULT_CURRENT_BALANCE_CONFIG
  }
}
