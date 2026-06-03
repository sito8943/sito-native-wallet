import { type ReactElement } from "react"
import { View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { borderWidth, radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

import { type AutoBadgeProps } from "./types"

// Small pill marking system-generated records (auto === true), e.g. balance
// adjustments. Online, the backend sets `auto`; offline we set it on generated
// records — this just renders the indicator.
export default function AutoBadge({
  label = "Auto",
}: AutoBadgeProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.badge}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.CAPTION}
        tone={TYPOGRAPHY_TONE.SUBTLE}
      >
        {label}
      </Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  badge: {
    alignSelf: "flex-start" as const,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(0.5),
  },
})
