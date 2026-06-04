import { type ReactNode } from "react"
import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native"

import { type AppIcon, type IconProps } from "#design/elements/Icon"

import { type ICON_BUTTON_SIZE, type ICON_BUTTON_VARIANT } from "./constants"

export type IconButtonVariant =
  (typeof ICON_BUTTON_VARIANT)[keyof typeof ICON_BUTTON_VARIANT]

export type IconButtonSize =
  (typeof ICON_BUTTON_SIZE)[keyof typeof ICON_BUTTON_SIZE]

export type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
  accessibilityLabel: string
  disabled?: boolean
  icon: AppIcon
  color?: string
  iconStyle?: IconProps["style"]
  size?: IconButtonSize
  style?: StyleProp<ViewStyle>
  variant?: IconButtonVariant
  children?: ReactNode
}
