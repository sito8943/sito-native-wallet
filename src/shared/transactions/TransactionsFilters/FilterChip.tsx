import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, radius, spacing } from "#design/foundations"

import { type FilterChipProps } from "./types"

export default function FilterChip({
  isActive,
  label,
  onPress,
}: FilterChipProps): ReactElement {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
    >
      <Typography
        variant="subtle"
        tone={isActive ? "inverted" : "default"}
        style={styles.chipLabel}
      >
        {label}
      </Typography>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
    textTransform: "none",
  },
})
