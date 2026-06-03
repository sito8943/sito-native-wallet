// Mirrors the web wallet / backend sort contract so the local query surface and
// a future ApiClient speak the same language.
export const SORT_ORDER = {
  ASC: "ASC",
  DESC: "DESC",
} as const

export const DEFAULT_PAGE_SIZE = 20
