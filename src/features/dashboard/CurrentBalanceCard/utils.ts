import {
  DEFAULT_CURRENT_BALANCE_CONFIG,
  type CurrentBalanceConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): CurrentBalanceConfig => {
  try {
    return raw
      ? (JSON.parse(raw) as CurrentBalanceConfig)
      : DEFAULT_CURRENT_BALANCE_CONFIG
  } catch {
    return DEFAULT_CURRENT_BALANCE_CONFIG
  }
}
