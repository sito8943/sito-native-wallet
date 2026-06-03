import { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { borderWidth } from "#design/foundations"
import { type ThemeColors } from "#design/theme"

import { BUTTON_VARIANT } from "./constants"
import { type ButtonColors, type ButtonVariant } from "./types"

export const getButtonColors = (
  colors: ThemeColors,
  variant: ButtonVariant,
): ButtonColors => {
  switch (variant) {
    case BUTTON_VARIANT.DANGER:
      return {
        backgroundColor: colors.negative,
        borderColor: colors.negative,
        borderWidth: borderWidth.thin,
        tone: TYPOGRAPHY_TONE.INVERTED,
      }
    case BUTTON_VARIANT.OUTLINED:
      return {
        backgroundColor: "transparent",
        borderColor: colors.border,
        borderWidth: borderWidth.thin,
        tone: TYPOGRAPHY_TONE.DEFAULT,
      }
    default:
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: borderWidth.thin,
        tone: TYPOGRAPHY_TONE.INVERTED,
      }
  }
}
