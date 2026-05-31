import { type Action } from "#shared/actions"

import { type SubscriptionProvider } from "../SubscriptionProvider"

export type SubscriptionProviderCardProps = {
  provider: SubscriptionProvider
  actions?: Array<Action<SubscriptionProvider>>
  onPress?: () => void
}
