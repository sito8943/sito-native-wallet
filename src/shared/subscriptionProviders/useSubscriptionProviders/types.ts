import { type QueryParam, type QueryResult } from "#shared/data"

import {
  type AddSubscriptionProviderDto,
  type FilterSubscriptionProviderDto,
} from "../dtos"
import { type SubscriptionProvider } from "../SubscriptionProvider"

export type UseSubscriptionProvidersOptions = {
  filters?: FilterSubscriptionProviderDto
  query?: QueryParam<SubscriptionProvider>
}

export type UseSubscriptionProvidersState = {
  data: SubscriptionProvider[]
  result: QueryResult<SubscriptionProvider>
  error: Error | null
  isLoading: boolean
  addSubscriptionProvider: (input: AddSubscriptionProviderDto) => void
  updateSubscriptionProvider: (
    id: number,
    input: AddSubscriptionProviderDto,
  ) => void
  removeSubscriptionProvider: (id: number) => void
}
