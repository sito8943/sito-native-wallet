import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddAccountDto } from "../../dtos"

import { type UseAccountState } from "./types"

// Selects a single account by id through the client's getById and binds its
// mutations, so detail/edit views don't list every account and filter in
// render. Locally getById is an in-memory lookup; a future ApiClient would make
// it a real GET /accounts/:id without changing this hook or its views.
export default function useAccount(id: number): UseAccountState {
  const client = useManager().Accounts
  // Subscribe to the store so the view re-renders on changes; the actual
  // selection is the client's responsibility, not the hook's. getById is a
  // cheap find that returns the stored reference, so no memo is needed.
  const { error, isLoading } = useClientStore(client)
  const account = client.getById(id) ?? null

  return {
    data: account,
    error,
    isLoading,
    update: (input: AddAccountDto) => {
      client.update(id, input)
    },
    remove: () => {
      client.remove(id)
    },
  }
}
