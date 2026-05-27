import { type ReactElement, type ReactNode } from "react"
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  type TextStyle,
} from "react-native"

import { colors, typography } from "#design/foundations"
import { TypographyProps } from "./types"

export default function Typography({
  children,
  variant = "body",
  tone = "default",
  style,
  ...props
}: TypographyProps): ReactElement {
  return (
    <Text {...props} style={[styles[variant], toneStyles[tone], style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create(typography)

const toneStyles = StyleSheet.create({
  default: {},
  muted: {
    color: colors.textMuted,
  },
  subtle: {
    color: colors.textSubtle,
  },
  inverted: {
    color: colors.textInverted,
  },
})
