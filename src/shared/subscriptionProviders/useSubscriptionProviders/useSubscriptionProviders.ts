import { useState } from "react"

import { INITIAL_SUBSCRIPTION_PROVIDERS } from "../demoData"

import { type UseSubscriptionProvidersState } from "./types"

export default function useSubscriptionProviders(): UseSubscriptionProvidersState {
  const [state] = useState<UseSubscriptionProvidersState>({
    data: INITIAL_SUBSCRIPTION_PROVIDERS,
    error: null,
    isLoading: false,
  })

  return state
}
