import { type ThemeColors } from "#shared/theme"

import { type TypographyProps } from "./types"

export const resolveToneColor = (
  colors: ThemeColors,
  tone: NonNullable<TypographyProps["tone"]>,
  variant: NonNullable<TypographyProps["variant"]>,
): string => {
  if (tone === "muted") return colors.textMuted
  if (tone === "subtle") return colors.textSubtle
  if (tone === "inverted") return colors.textInverted

  const isMutedVariant =
    variant === "caption" || variant === "label" || variant === "subtle"
  return isMutedVariant ? colors.textMuted : colors.textStrong
}
