import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

import { type Action } from "#design/interactions"

export type EntityCardProps<T> = {
  entity: T
  children: ReactNode
  actions?: Array<Action<T>>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  // Drops the card's drop-shadow/elevation (e.g. nested inside another surface).
  flat?: boolean
}
