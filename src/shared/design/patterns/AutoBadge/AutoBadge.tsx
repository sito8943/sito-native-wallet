import { type ReactElement } from "react"
import { View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

import { type AutoBadgeProps } from "./types"

// Small pill marking system-generated records (auto === true), e.g. balance
// adjustments. Online, the backend sets `auto`; offline we set it on generated
// records — this just renders the indicator.
export default function AutoBadge({
  showLabel = true,
}: AutoBadgeProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.badge}>
      <Icon style={styles.icon} icon={APP_ICONS.prefabs} />
      {showLabel && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.CAPTION}
          tone={TYPOGRAPHY_TONE.SUBTLE}
        >
          Automatically generated
        </Typography>
      )}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  icon: {
    color: colors.primary,
  },
  badge: {
    alignSelf: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(1),
  },
})
