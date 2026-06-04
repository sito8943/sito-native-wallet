import { useMemo } from "react"

import { useAccounts } from "#shared/accounts"
import { useCategories } from "#shared/categories"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddTransactionDto } from "../dtos"
import { resolveTransactions } from "../Transaction"

import { type UseTransactionsOptions, type UseTransactionsState } from "./types"

export default function useTransactions(
  options: UseTransactionsOptions = {},
): UseTransactionsState {
  const { accountId } = options
  const client = useManager().Transactions
  const { items, error, isLoading } = useClientStore(client)
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const data = useMemo(() => {
    const resolved = resolveTransactions(items, accounts ?? [], categories)

    return accountId === undefined
      ? resolved
      : resolved.filter((transaction) => transaction.account.id === accountId)
  }, [items, accounts, categories, accountId])

  return {
    data,
    error,
    isLoading,
    addTransaction: (input: AddTransactionDto) => {
      client.add(input)
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
