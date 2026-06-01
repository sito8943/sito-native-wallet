import { type ReactNode } from "react"
import { type Animated, type PanResponderInstance } from "react-native"

export type BottomSheetProps = {
  open: boolean
  title?: string
  onClose: () => void
  children?: ReactNode
}

export type SwipeToClose = {
  translateY: Animated.Value
  panHandlers: PanResponderInstance["panHandlers"]
}
