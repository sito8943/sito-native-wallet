import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

import { type Action } from "#shared/actions"

export type EntityCardProps<T> = {
  entity: T
  children: ReactNode
  actions?: Array<Action<T>>
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}
