import { type ReactElement } from "react"
import { StyleSheet, Text } from "react-native"

import { typography } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { type TypographyProps } from "./types"

export default function Typography({
  children,
  variant = "body",
  tone = "default",
  style,
  ...props
}: TypographyProps): ReactElement {
  const colors = useThemeColors()

  const toneStyles = StyleSheet.create({
    default: {
      color:
        variant === "caption" || variant === "label" || variant === "subtle"
          ? colors.textMuted
          : colors.textStrong,
    },
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

  return (
    <Text {...props} style={[styles[variant], toneStyles[tone], style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create(typography)
