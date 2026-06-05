import {
  DEFAULT_WEEKLY_SPENT_CONFIG,
  type WeeklySpentConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): WeeklySpentConfig => {
  try {
    return raw
      ? (JSON.parse(raw) as WeeklySpentConfig)
      : DEFAULT_WEEKLY_SPENT_CONFIG
  } catch {
    return DEFAULT_WEEKLY_SPENT_CONFIG
  }
}
