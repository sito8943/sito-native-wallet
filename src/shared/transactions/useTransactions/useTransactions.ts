import { useMemo } from "react"

import { useAccounts } from "#shared/accounts"
import { useCategories } from "#shared/categories"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddTransactionDto } from "../dtos"
import { resolveTransactions } from "../Transaction"

import { type UseTransactionsState } from "./types"

export default function useTransactions(): UseTransactionsState {
  const client = useManager().Transactions
  const { items, error, isLoading } = useClientStore(client)
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const data = useMemo(
    () => resolveTransactions(items, accounts ?? [], categories),
    [items, accounts, categories],
  )

  return {
    data,
    error,
    isLoading,
    addTransaction: (input: AddTransactionDto) => {
      client.add(input)
    },
    updateTransaction: (id: string, input: AddTransactionDto) => {
      client.update(id, input)
    },
    removeTransaction: (id: string) => {
      client.remove(id)
    },
  }
}
