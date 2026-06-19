import { type StyleProp, type ViewStyle } from "react-native"

import { type Action } from "#design/interactions"

import { type Currency } from "../../Currency"

export type CurrencyCardProps = {
  currency: Currency
  actions?: Array<Action<Currency>>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}
