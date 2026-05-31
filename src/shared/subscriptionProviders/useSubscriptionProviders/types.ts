import { type AddSubscriptionProviderDto } from "../dtos"
import { type SubscriptionProvider } from "../SubscriptionProvider"

export type UseSubscriptionProvidersState = {
  data: SubscriptionProvider[]
  error: Error | null
  isLoading: boolean
  addSubscriptionProvider: (input: AddSubscriptionProviderDto) => void
  updateSubscriptionProvider: (
    id: string,
    input: AddSubscriptionProviderDto,
  ) => void
  removeSubscriptionProvider: (id: string) => void
}
