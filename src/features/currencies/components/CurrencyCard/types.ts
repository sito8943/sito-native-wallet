import { type StyleProp, type ViewStyle } from "react-native"

import { type Action } from "#design/interactions"

import { type Currency } from "../../Currency"

export type CurrencyCardProps = {
  currency: Currency
  actions?: Array<Action<Currency>>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  // Drops the card's shadow (e.g. selectable lists that use a border instead).
  flat?: boolean
}
