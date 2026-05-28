import { type ReactElement } from "react"
import { StyleSheet, Text } from "react-native"

import { typography } from "#design/foundations"
import { useThemeColors, type ThemeColors } from "#shared/theme"

import { type TypographyProps } from "./types"

export default function Typography({
  children,
  variant = "body",
  tone = "default",
  style,
  ...props
}: TypographyProps): ReactElement {
  const colors = useThemeColors()
  const color = resolveToneColor(colors, tone, variant)

  return (
    <Text {...props} style={[styles[variant], { color }, style]}>
      {children}
    </Text>
  )
}

const resolveToneColor = (
  colors: ThemeColors,
  tone: NonNullable<TypographyProps["tone"]>,
  variant: NonNullable<TypographyProps["variant"]>,
): string => {
  if (tone === "muted") return colors.textMuted
  if (tone === "subtle") return colors.textSubtle
  if (tone === "inverted") return colors.textInverted

  const isMutedVariant =
    variant === "caption" || variant === "label" || variant === "subtle"
  return isMutedVariant ? colors.textMuted : colors.textStrong
}

const styles = StyleSheet.create(typography)
