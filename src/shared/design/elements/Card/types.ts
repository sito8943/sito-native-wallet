import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

export type CardPropsType = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
