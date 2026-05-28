import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { radius, spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { type BadgeProps } from "./types"

export default function Badge({
  children,
  tone = "neutral",
  style,
}: BadgeProps): ReactElement {
  const colors = useThemeColors()

  const toneStyles = StyleSheet.create({
    neutral: {
      backgroundColor: colors.primary,
    },
    positive: {
      backgroundColor: colors.positive,
    },
    negative: {
      backgroundColor: colors.negative,
    },
  })

  return <View style={[styles.badge, toneStyles[tone], style]}>{children}</View>
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
})
