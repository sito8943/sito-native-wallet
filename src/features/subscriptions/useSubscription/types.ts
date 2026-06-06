import { type Subscription } from "../Subscription"

export type UseSubscriptionState = {
  data: Subscription | null
  error: Error | null
  isLoading: boolean
}
