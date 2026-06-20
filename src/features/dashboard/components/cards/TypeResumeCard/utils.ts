import {
  DEFAULT_TYPE_RESUME_CONFIG,
  type TypeResumeConfig,
} from "../DashboardCard"

// Older native configs stored excluded categories as snapshot objects under
// `excludeCategories`/`oppositeExcludeCategories`; the current shape (web parity)
// is id arrays under `excludedCategoryIds`/`oppositeExcludedCategoryIds`. Read
// the id array when present, else fall back to the legacy objects' ids.
const migrateExcludedIds = (ids: unknown, legacy: unknown): number[] => {
  if (Array.isArray(ids)) {
    return ids.filter((id): id is number => typeof id === "number")
  }
  if (Array.isArray(legacy)) {
    return legacy
      .map((entry) => (entry as { id?: number } | null)?.id)
      .filter((id): id is number => typeof id === "number")
  }
  return []
}

export const parseConfig = (raw: string | null): TypeResumeConfig => {
  try {
    if (!raw) return DEFAULT_TYPE_RESUME_CONFIG
    // Spread the default so configs persisted before a field existed still
    // resolve to a complete shape.
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return {
      ...DEFAULT_TYPE_RESUME_CONFIG,
      ...(parsed as Partial<TypeResumeConfig>),
      excludedCategoryIds: migrateExcludedIds(
        parsed.excludedCategoryIds,
        parsed.excludeCategories,
      ),
      oppositeExcludedCategoryIds: migrateExcludedIds(
        parsed.oppositeExcludedCategoryIds,
        parsed.oppositeExcludeCategories,
      ),
    }
  } catch {
    return DEFAULT_TYPE_RESUME_CONFIG
  }
}
