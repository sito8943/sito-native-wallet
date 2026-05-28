import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import { type ThemeColors } from "#shared/theme"

import { TYPOGRAPHY_TONE } from "./constants"
import { type TypographyProps } from "./types"

export const resolveToneColor = (
  colors: ThemeColors,
  tone: NonNullable<TypographyProps["tone"]>,
  variant: NonNullable<TypographyProps["variant"]>,
): string => {
  if (tone === TYPOGRAPHY_TONE.MUTED) return colors.textMuted
  if (tone === TYPOGRAPHY_TONE.SUBTLE) return colors.textSubtle
  if (tone === TYPOGRAPHY_TONE.INVERTED) return colors.textInverted

  const isMutedVariant =
    variant === TYPOGRAPHY_VARIANT.CAPTION ||
    variant === TYPOGRAPHY_VARIANT.LABEL ||
    variant === TYPOGRAPHY_VARIANT.SUBTLE
  return isMutedVariant ? colors.textMuted : colors.textStrong
}
