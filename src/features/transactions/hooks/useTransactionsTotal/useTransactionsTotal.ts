import { useMemo } from "react"

import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type FilterTransactionDto } from "../../dtos"

// Sum of transaction amounts matching the filters (e.g. a dashboard type-resume
// total). The client owns the aggregation; this hook just subscribes to the
// relevant stores so the total re-computes when they change, and asks.
export default function useTransactionsTotal(
  filters?: FilterTransactionDto,
): number {
  const client = useManager().Transactions
  const { items } = useClientStore(client)
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const filtersKey = JSON.stringify(filters ?? {})

  return useMemo(
    () => client.total(filters),
    // items/accounts/categories aren't read here (the client joins + sums), but
    // must re-trigger the memo when those stores change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, items, accounts, categories, filtersKey],
  )
}
