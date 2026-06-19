import { type Action } from "#design/interactions"

import { type SubscriptionProvider } from "../../SubscriptionProvider"

export type SubscriptionProviderCardProps = {
  provider: SubscriptionProvider
  actions?: Array<Action<SubscriptionProvider>>
  onPress?: () => void
}
