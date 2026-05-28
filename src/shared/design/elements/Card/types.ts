import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

export type CardProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
