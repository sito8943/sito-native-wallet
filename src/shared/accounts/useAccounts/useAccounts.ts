import { useManager } from "#shared/data"
import { useClientStore } from "#shared/storage"

import { type AddAccountDto } from "../dtos"

import { type UseAccountsState } from "./types"

export default function useAccounts(): UseAccountsState {
  const client = useManager().Accounts
  const { items, error, isLoading } = useClientStore(client)

  return {
    data: items,
    error,
    isLoading,
    addAccount: (input: AddAccountDto) => {
      client.add(input)
    },
    updateAccount: (id: string, input: AddAccountDto) => {
      client.update(id, input)
    },
    removeAccount: (id: string) => {
      client.remove(id)
    },
  }
}
