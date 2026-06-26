import { DEFAULT_PAGE_SIZE, SORT_ORDER } from "./constants"
import { type QueryParam, type QueryResult } from "./types"

// Generic compare for the common scalar field types. Strings use code-point
// order (NOT localeCompare): collation treats the "/" ":" and space in our
// "YYYY/MM/DD HH:mm" stamps as ignorable/low-priority, which scrambles date
// order — plain lexicographic compare is correct for these fixed-width stamps
// and deterministic across engines (Node vs Hermes). Unknown types keep order.
const lexicographic = (a: string, b: string): number =>
  a < b ? -1 : a > b ? 1 : 0

const compare = (a: unknown, b: unknown): number => {
  if (a === b) {
    return 0
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b
  }

  if (typeof a === "string" && typeof b === "string") {
    return lexicographic(a, b)
  }

  return lexicographic(String(a), String(b))
}

// Pure filter → sort → paginate over an in-memory array, returning the same
// QueryResult shape the backend would. Selection logic (the predicate) is the
// caller's; a future ApiClient produces the same shape from a real request.
export const applyQuery = <T>(
  items: T[],
  params: QueryParam<T> = {},
  predicate?: (item: T) => boolean,
): QueryResult<T> => {
  const {
    sortingBy = null,
    sortingOrder = SORT_ORDER.ASC,
    currentPage = 0,
    pageSize = DEFAULT_PAGE_SIZE,
  } = params

  const filtered =
    predicate === undefined ? items : items.filter((item) => predicate(item))

  const sorted =
    sortingBy === null
      ? filtered
      : [...filtered].sort((a, b) => {
          const direction = sortingOrder === SORT_ORDER.DESC ? -1 : 1
          return compare(a[sortingBy], b[sortingBy]) * direction
        })

  const totalElements = sorted.length
  const totalPages = pageSize > 0 ? Math.ceil(totalElements / pageSize) : 1
  const start = currentPage * pageSize
  const pageItems =
    pageSize > 0 ? sorted.slice(start, start + pageSize) : sorted

  return {
    sort: sortingBy,
    order: sortingOrder,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    items: pageItems,
  }
}
