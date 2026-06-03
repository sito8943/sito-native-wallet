import { useMemo } from "react"

import { useAccounts } from "#shared/accounts"
import { useCategories } from "#shared/categories"
import { applyQuery, SORT_ORDER, useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { matchesTransactionFilter, resolveTransactions } from "../Transaction"

import {
  type UseTransactionsListProps,
  type UseTransactionsListState,
} from "./types"

// List hook with the full filter + sort + pagination contract (mirrors the web
// wallet's useTransactionsList). Resolves the stored transactions, then runs
// applyQuery with a predicate built from the filters. Filtering happens here
// rather than on the client because it touches joined fields (type, category)
// that only exist after resolution; an ApiClient would push filters/query to
// the server instead.
export default function useTransactionsList({
  filters = {},
  query = {},
}: UseTransactionsListProps = {}): UseTransactionsListState {
  const client = useManager().Transactions
  const { items, error, isLoading } = useClientStore(client)
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  // Default sort: newest first by date, matching the previous behavior.
  const sortingBy = query.sortingBy ?? "date"
  const sortingOrder = query.sortingOrder ?? SORT_ORDER.DESC

  const filtersKey = JSON.stringify(filters)
  const queryKey = JSON.stringify({ ...query, sortingBy, sortingOrder })

  const result = useMemo(
    () => {
      const resolved = resolveTransactions(items, accounts ?? [], categories)
      return applyQuery(
        resolved,
        { ...query, sortingBy, sortingOrder },
        matchesTransactionFilter(filters),
      )
    },
    // filters/query are object literals; key on their content to avoid
    // recomputing on every render from a fresh reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, accounts, categories, filtersKey, queryKey],
  )

  return { result, error, isLoading }
}
