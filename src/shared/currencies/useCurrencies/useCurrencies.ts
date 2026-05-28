import { useState } from "react"

import { INITIAL_CURRENCIES } from "../demoData"

import { type UseCurrenciesState } from "./types"

export default function useCurrencies(): UseCurrenciesState {
  const [state] = useState<UseCurrenciesState>({
    data: INITIAL_CURRENCIES,
    error: null,
    isLoading: false,
  })

  return state
}
