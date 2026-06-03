import { DEFAULT_PAGE_SIZE, SORT_ORDER } from "./constants"
import { type QueryParam, type QueryResult } from "./types"

// Generic compare for the common scalar field types (string, number, boolean,
// and date-ish strings sort lexicographically, which is correct for ISO and
// YYYY/MM/DD stamps). Unknown types keep their order.
const compare = (a: unknown, b: unknown): number => {
  if (a === b) {
    return 0
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b
  }

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b)
  }

  return String(a).localeCompare(String(b))
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
