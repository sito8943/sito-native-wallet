import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddAccountDto } from "../../dtos"

import { type UseAccountsOptions, type UseAccountsState } from "./types"

export default function useAccounts(
  options: UseAccountsOptions = {},
): UseAccountsState {
  const { filters, query } = options
  const client = useManager().Accounts
  const { error, isLoading } = useClientStore(client)

  // The client owns filter matching; pageSize 0 = full list by default.
  const result = client.list({ pageSize: 0, ...query }, filters)

  return {
    data: result.items,
    result,
    error,
    isLoading,
    addAccount: (input: AddAccountDto) => {
      client.add(input)
    },
    // No client.addMany: account creation also records an opening transaction,
    // so each prefab goes through the normal add() path.
    addAccounts: (inputs: AddAccountDto[]) => {
      inputs.forEach((input) => {
        client.add(input)
      })
    },
    updateAccount: (id: number, input: AddAccountDto) => {
      client.update(id, input)
    },
    removeAccount: (id: number) => {
      client.remove(id)
    },
  }
}
