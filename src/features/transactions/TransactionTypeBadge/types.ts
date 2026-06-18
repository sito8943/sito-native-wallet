import { type StyleProp, type TextStyle, type ViewStyle } from "react-native"

import { type TransactionType } from "#features/categories"

export type TransactionTypeBadgeProps = {
  type: TransactionType
  showIcon?: boolean
  showText?: boolean
  filled?: boolean
  // Overrides the badge container (e.g. transparent background, custom size).
  style?: StyleProp<ViewStyle>
  // Styles the icon; a `fontSize` here sets the icon size.
  iconStyle?: StyleProp<TextStyle>
}
