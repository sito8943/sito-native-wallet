import { type ReactElement } from "react"
import { StyleSheet, Text } from "react-native"

import { typography } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { type TypographyProps } from "./types"
import { resolveToneColor } from "./utils"

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

const styles = StyleSheet.create(typography)
