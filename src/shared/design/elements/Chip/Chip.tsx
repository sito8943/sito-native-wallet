import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"

import { type ChipProps } from "./types"

export default function Chip({
  active,
  label,
  onPress,
  onClear,
}: ChipProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()

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
      {onClear ? (
        <Pressable
          accessibilityRole="button"
          hitSlop={spacing(2)}
          onPress={onClear}
        >
          <Icon
            icon={APP_ICONS.close}
            size={spacing(3)}
            color={active ? colors.textInverted : colors.textMuted}
          />
        </Pressable>
      ) : null}
    </Pressable>
  )
}

const createStyles = (colors: ThemeColors) => ({
  chip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing(1),
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
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
