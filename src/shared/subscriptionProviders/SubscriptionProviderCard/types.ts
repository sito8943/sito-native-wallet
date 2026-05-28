import { type SubscriptionProvider } from "../SubscriptionProvider"

export type SubscriptionProviderCardProps = {
  provider: SubscriptionProvider
  onPress?: (provider: SubscriptionProvider) => void
}
