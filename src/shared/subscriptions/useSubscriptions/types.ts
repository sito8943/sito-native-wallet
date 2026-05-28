import { type Subscription } from "../Subscription"

export type UseSubscriptionsState = {
  data: Subscription[] | null
  error: Error | null
  isLoading: boolean
}
