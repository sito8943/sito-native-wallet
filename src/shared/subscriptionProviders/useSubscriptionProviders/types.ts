import { type SubscriptionProvider } from "../SubscriptionProvider"

export type UseSubscriptionProvidersState = {
  data: SubscriptionProvider[] | null
  error: Error | null
  isLoading: boolean
}
