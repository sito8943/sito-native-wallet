import { useState } from "react"

import { INITIAL_ACCOUNTS } from "./constants"
import { type Account } from "./types"

type UseAccountsState = {
  data: Account[] | null
  error: Error | null
  isLoading: boolean
}

export default function useAccounts(): UseAccountsState {
  const [state] = useState<UseAccountsState>({
    data: INITIAL_ACCOUNTS,
    error: null,
    isLoading: false,
  })

  return state
}
