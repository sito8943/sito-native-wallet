import { type CurrentBalanceConfig } from "../DashboardCard"

export const parseConfig = (raw: string | null): CurrentBalanceConfig => {
  try {
    return raw ? (JSON.parse(raw) as CurrentBalanceConfig) : {}
  } catch {
    return {}
  }
}
