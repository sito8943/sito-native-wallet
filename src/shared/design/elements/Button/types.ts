import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native"

import { type TypographyTone } from "#design/elements/Typography"

import { type BUTTON_VARIANT } from "./constants"

export type ButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT]

export type ButtonColors = {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  tone: TypographyTone
}

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  label: string
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}
