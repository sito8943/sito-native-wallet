import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { type ChipProps } from "./types"

export default function Chip({
  active,
  label,
  onPress,
}: ChipProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Typography
        variant={TYPOGRAPHY_VARIANT.SUBTLE}
        tone={active ? TYPOGRAPHY_TONE.INVERTED : TYPOGRAPHY_TONE.DEFAULT}
        style={styles.chipLabel}
      >
        {label}
      </Typography>
    </Pressable>
  )
}

const createStyles = (colors: ThemeColors) => ({
  chip: {
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipLabel: {
    textTransform: "none" as const,
  },
})
