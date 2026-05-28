import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { type FilterChipProps } from "./types"

export default function FilterChip({
  active,
  label,
  onPress,
}: FilterChipProps): ReactElement {
  const colors = useThemeColors()

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active
          ? {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            }
          : {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
      ]}
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

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chipLabel: {
    textTransform: "none",
  },
})
