import { useMemo } from "react"

import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { SORT_ORDER, useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddTransferDto, type AddTransactionDto } from "../../dtos"

import { type UseTransactionsOptions, type UseTransactionsState } from "./types"

export default function useTransactions(
  options: UseTransactionsOptions = {},
): UseTransactionsState {
  const { accountId } = options
  const client = useManager().Transactions
  const { items, error, isLoading } = useClientStore(client)
  // Subscribe to the related stores so the list re-resolves when an account or
  // category changes; the client owns the actual join (UI just asks for it).
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const data = useMemo(
    () =>
      client.list(
        { pageSize: 0, sortingBy: "date", sortingOrder: SORT_ORDER.DESC },
        accountId !== undefined ? { accountId } : undefined,
      ).items,
    // items/accounts/categories aren't read here (the client joins them), but
    // they must re-trigger the memo when those stores change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, items, accounts, categories, accountId],
  )

  return {
    data,
    error,
    isLoading,
    addTransaction: (input: AddTransactionDto) => {
      client.add(input)
    },
    transferTransaction: (input: AddTransferDto) => {
      client.transfer(input)
    },
    updateTransaction: (id: number, input: AddTransactionDto) => {
      client.update(id, input)
    },
    removeTransaction: (id: number) => {
      client.remove(id)
    },
    adjustBalance: (
      accountId: number,
      newBalance: number,
      description?: string,
    ) => {
      client.adjustBalance(accountId, newBalance, description)
    },
  }
}
