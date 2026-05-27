import { useState } from "react"

import { INITIAL_CURRENCIES } from "./constants"
import { type Currency } from "./types"

type UseCurrenciesState = {
  data: Currency[] | null
  error: Error | null
  isLoading: boolean
}

export default function useCurrencies(): UseCurrenciesState {
  const [state] = useState<UseCurrenciesState>({
    data: INITIAL_CURRENCIES,
    error: null,
    isLoading: false,
  })

  return state
}
