import { type StyleProp, type ViewStyle } from "react-native"

import { type Action } from "#design/interactions"

import { type SubscriptionProvider } from "../../SubscriptionProvider"

export type SubscriptionProviderCardProps = {
  provider: SubscriptionProvider
  actions?: Array<Action<SubscriptionProvider>>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  // Drops the card's shadow (e.g. selectable lists that use a border instead).
  flat?: boolean
}
