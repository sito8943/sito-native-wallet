import {
  DEFAULT_TYPE_RESUME_CONFIG,
  type TypeResumeConfig,
} from "../DashboardCard"

export const parseConfig = (raw: string | null): TypeResumeConfig => {
  try {
    return raw
      ? (JSON.parse(raw) as TypeResumeConfig)
      : DEFAULT_TYPE_RESUME_CONFIG
  } catch {
    return DEFAULT_TYPE_RESUME_CONFIG
  }
}
