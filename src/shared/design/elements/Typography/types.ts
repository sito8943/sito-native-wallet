import { type ReactNode } from "react"
import { type StyleProp, type TextProps, type TextStyle } from "react-native"

import { type TYPOGRAPHY_VARIANT } from "#design/foundations"

import { type TYPOGRAPHY_TONE } from "./constants"

export type TypographyVariant =
  (typeof TYPOGRAPHY_VARIANT)[keyof typeof TYPOGRAPHY_VARIANT]
export type TypographyTone =
  (typeof TYPOGRAPHY_TONE)[keyof typeof TYPOGRAPHY_TONE]

export type TypographyProps = TextProps & {
  children: ReactNode
  variant?: TypographyVariant
  tone?: TypographyTone
  style?: StyleProp<TextStyle>
}
