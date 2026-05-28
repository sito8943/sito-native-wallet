import type FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { type ComponentProps, type ReactNode } from "react"
import {
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native"

import {
  type ICON_BUTTON_SIZE,
  type ICON_BUTTON_VARIANT,
} from "./constants"

export type IconButtonVariant =
  (typeof ICON_BUTTON_VARIANT)[keyof typeof ICON_BUTTON_VARIANT]

export type IconButtonSize =
  (typeof ICON_BUTTON_SIZE)[keyof typeof ICON_BUTTON_SIZE]

export type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
  accessibilityLabel: string
  disabled?: boolean
  icon: ComponentProps<typeof FontAwesome5>["name"]
  iconStyle?: StyleProp<TextStyle>
  size?: IconButtonSize
  style?: StyleProp<ViewStyle>
  variant?: IconButtonVariant
  children?: ReactNode
}
