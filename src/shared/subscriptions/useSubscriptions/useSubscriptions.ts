import { useState } from "react"

import { INITIAL_SUBSCRIPTIONS } from "../demoData"
import { sortByNextRenewal } from "../Subscription"

import { type UseSubscriptionsState } from "./types"

export default function useSubscriptions(): UseSubscriptionsState {
  const [state] = useState<UseSubscriptionsState>({
    data: sortByNextRenewal(INITIAL_SUBSCRIPTIONS),
    error: null,
    isLoading: false,
  })

  return state
}
