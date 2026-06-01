import { type StyleProp, type ViewStyle } from "react-native"

import { type AppIcon } from "#design/elements/Icon"
import {
  type IconButtonSize,
  type IconButtonVariant,
} from "#design/elements/IconButton"

import { type FAB_POSITION } from "./constants"

export type FabPosition = (typeof FAB_POSITION)[keyof typeof FAB_POSITION]

export type FABProps = {
  accessibilityLabel: string
  icon: AppIcon
  onPress: () => void
  disabled?: boolean
  label?: string
  position?: FabPosition
  size?: IconButtonSize
  variant?: IconButtonVariant
  style?: StyleProp<ViewStyle>
}
