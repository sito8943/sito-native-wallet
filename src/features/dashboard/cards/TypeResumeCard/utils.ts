import {
  DEFAULT_TYPE_RESUME_CONFIG,
  type TypeResumeConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): TypeResumeConfig => {
  try {
    // Spread the default so configs persisted before a field existed (e.g.
    // excludeCategories) still resolve to a complete shape.
    return raw
      ? { ...DEFAULT_TYPE_RESUME_CONFIG, ...(JSON.parse(raw) as TypeResumeConfig) }
      : DEFAULT_TYPE_RESUME_CONFIG
  } catch {
    return DEFAULT_TYPE_RESUME_CONFIG
  }
}
