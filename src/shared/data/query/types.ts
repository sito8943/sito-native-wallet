import { type SORT_ORDER } from "./constants"

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

// Pagination + sort, keyed by a field of the entity. Mirrors the web wallet's
// QueryParam<TDto> so a list hook's call site matches the backend contract.
export type QueryParam<T> = {
  sortingBy?: keyof T
  sortingOrder?: SortOrder
  // Zero-indexed, matching the backend.
  currentPage?: number
  pageSize?: number
}

// The shape every list returns — locally produced by applyQuery, online by the
// API. Lets infinite/virtual lists compute hasNextPage from currentPage/total.
export type QueryResult<T> = {
  sort: keyof T | null
  order: SortOrder
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
  items: T[]
}
