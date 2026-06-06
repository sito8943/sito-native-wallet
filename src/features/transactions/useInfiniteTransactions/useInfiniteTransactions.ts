import { useEffect, useMemo, useState } from "react"

import { DEFAULT_PAGE_SIZE } from "#shared/data"

import { useTransactionsList } from "../useTransactionsList"

import {
  type UseInfiniteTransactionsProps,
  type UseInfiniteTransactionsState,
} from "./types"

// Infinite/virtual-list variant: accumulates pages as the user scrolls. Locally
// everything is in memory, so a "page" is just a larger slice; the contract
// (hasNextPage/fetchNextPage) matches the web's useInfiniteQuery so a virtual
// list and a future API client behave the same.
export default function useInfiniteTransactions({
  filters = {},
  query = {},
}: UseInfiniteTransactionsProps = {}): UseInfiniteTransactionsState {
  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE
  const [page, setPage] = useState(0)

  // Pull the full filtered + sorted result (pageSize 0 = no pagination), then
  // slice locally up to the loaded page.
  const { result, error, isLoading } = useTransactionsList({
    filters,
    query: { ...query, pageSize: 0 },
  })

  const filtersKey = JSON.stringify(filters)
  const queryKey = JSON.stringify(query)

  // Reset to the first page whenever the filters or sort change.
  useEffect(() => {
    setPage(0)
  }, [filtersKey, queryKey])

  const total = result.totalElements
  const loadedCount = Math.min((page + 1) * pageSize, total)

  const items = useMemo(
    () => result.items.slice(0, loadedCount),
    [result.items, loadedCount],
  )

  return {
    items,
    total,
    hasNextPage: loadedCount < total,
    fetchNextPage: () => {
      setPage((current) => current + 1)
    },
    error,
    isLoading,
  }
}
