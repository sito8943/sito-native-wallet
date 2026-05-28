import { type ReactElement } from "react"
import { View } from "react-native"

import { radius, spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { BADGE_TONE } from "./constants"
import { type BadgeProps } from "./types"

export default function Badge({
  children,
  tone = BADGE_TONE.NEUTRAL,
  style,
}: BadgeProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return <View style={[styles.badge, styles[tone], style]}>{children}</View>
}

const createStyles = (colors: ThemeColors) => ({
  badge: {
    alignSelf: "flex-start" as const,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  neutral: { backgroundColor: colors.primary },
  positive: { backgroundColor: colors.positive },
  negative: { backgroundColor: colors.negative },
})
