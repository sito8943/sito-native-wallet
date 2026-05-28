import type FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { type ComponentProps, type ReactNode } from "react"
import {
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native"

export type IconButtonVariant = "filled" | "outlined" | "text"

export type IconButtonSize = "sm" | "md" | "lg"

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
