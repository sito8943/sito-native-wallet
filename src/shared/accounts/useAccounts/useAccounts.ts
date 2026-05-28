import { useState } from "react"

import { INITIAL_ACCOUNTS } from "../demoData"

import { type UseAccountsState } from "./types"

export default function useAccounts(): UseAccountsState {
  const [state] = useState<UseAccountsState>({
    data: INITIAL_ACCOUNTS,
    error: null,
    isLoading: false,
  })

  return state
}
