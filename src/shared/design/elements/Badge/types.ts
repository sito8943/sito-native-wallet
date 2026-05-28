import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

import { type BADGE_TONE } from "./constants"

export type BadgeTone = (typeof BADGE_TONE)[keyof typeof BADGE_TONE]

export type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
  style?: StyleProp<ViewStyle>
}
