import { type ReactElement } from "react"
import { StyleSheet, Text } from "react-native"

import { typography, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { TYPOGRAPHY_TONE } from "./constants"
import { type TypographyProps } from "./types"
import { resolveToneColor } from "./utils"

export default function Typography({
  children,
  variant = TYPOGRAPHY_VARIANT.BODY,
  tone = TYPOGRAPHY_TONE.DEFAULT,
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
