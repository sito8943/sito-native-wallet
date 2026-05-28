import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { type FilterChipProps } from "./types"

export default function FilterChip({
  active,
  label,
  onPress,
}: FilterChipProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Typography
        variant="subtle"
        tone={active ? "inverted" : "default"}
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
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
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
