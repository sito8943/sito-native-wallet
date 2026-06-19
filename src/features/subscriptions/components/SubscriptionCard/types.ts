import { type Subscription } from "../../Subscription"

export type SubscriptionCardProps = {
  subscription: Subscription
  onPress?: (subscription: Subscription) => void
}
