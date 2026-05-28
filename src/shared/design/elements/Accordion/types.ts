import { type ReactNode } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

export type AccordionProps = {
  header: ReactNode
  children: ReactNode
  defaultExpanded?: boolean
  style?: StyleProp<ViewStyle>
}
