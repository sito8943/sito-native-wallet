import { useState } from "react"

import { INITIAL_TRANSACTIONS } from "./constants"
import { type UseTransactionsState } from "./types"
import { sortByDate } from "./utils"

export default function useTransactions(): UseTransactionsState {
  const [state] = useState<UseTransactionsState>({
    data: sortByDate(INITIAL_TRANSACTIONS),
    error: null,
    isLoading: false,
  })

  return state
}
