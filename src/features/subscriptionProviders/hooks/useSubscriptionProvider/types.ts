import { type AddSubscriptionProviderDto } from "../../dtos"
import { type SubscriptionProvider } from "../../SubscriptionProvider"

export type UseSubscriptionProviderState = {
  data: SubscriptionProvider | null
  error: Error | null
  isLoading: boolean
  update: (input: AddSubscriptionProviderDto) => void
  remove: () => void
}
