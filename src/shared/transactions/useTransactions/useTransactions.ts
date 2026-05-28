import { useState } from "react"

import { INITIAL_TRANSACTIONS } from "../demoData"
import { sortByDate } from "../Transaction"

import { type UseTransactionsState } from "./types"

export default function useTransactions(): UseTransactionsState {
  const [state] = useState<UseTransactionsState>({
    data: sortByDate(INITIAL_TRANSACTIONS),
    error: null,
    isLoading: false,
  })

  return state
}
