import { useMemo } from "react"

import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { SORT_ORDER, useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import {
  type UseTransactionsListProps,
  type UseTransactionsListState,
} from "./types"

// List hook with the full filter + sort + pagination contract (mirrors the web
// wallet's useTransactionsList). Resolution + filtering live on the client (the
// backend seam); this hook just subscribes to the relevant stores and forwards
// the filters/query, the same way it would consume an API.
export default function useTransactionsList({
  filters = {},
  query = {},
}: UseTransactionsListProps = {}): UseTransactionsListState {
  const client = useManager().Transactions
  const { items, error, isLoading } = useClientStore(client)
  // Subscribe so the list re-resolves when an account or category changes.
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  // Default sort: newest first by date, matching the previous behavior.
  const sortingBy = query.sortingBy ?? "date"
  const sortingOrder = query.sortingOrder ?? SORT_ORDER.DESC

  const filtersKey = JSON.stringify(filters)
  const queryKey = JSON.stringify({ ...query, sortingBy, sortingOrder })

  const result = useMemo(
    () => client.list({ ...query, sortingBy, sortingOrder }, filters),
    // filters/query are object literals; key on their content to avoid
    // recomputing on every render from a fresh reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, items, accounts, categories, filtersKey, queryKey],
  )

  return { result, error, isLoading }
}
