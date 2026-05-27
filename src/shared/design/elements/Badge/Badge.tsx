import { type ReactElement, type ReactNode } from "react"
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native"

import { colors, radius, spacing, typography } from "#design/foundations"

import Typography from "../Typography"
import { BadgeProps } from "./types"

export default function Badge({
  children,
  tone = "neutral",
  style,
}: BadgeProps): ReactElement {
  return (
    <View style={[styles.badge, toneStyles[tone], style]}>
      <Typography variant="caption" tone="inverted" style={styles.label}>
        {children}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm - 2,
    paddingVertical: spacing.xxs,
  },
  label: typography.label,
})

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
