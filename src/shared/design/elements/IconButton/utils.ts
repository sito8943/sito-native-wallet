import { type useThemeColors } from "#shared/theme"

import { ICON_BUTTON_VARIANT } from "./constants"
import { type IconButtonVariant } from "./types"

export const getIconColor = ({
  colors,
  disabled,
  variant,
}: {
  colors: ReturnType<typeof useThemeColors>
  disabled: boolean
  variant: IconButtonVariant
}): string => {
  if (disabled) {
    return colors.textSubtle
  }

  if (variant === ICON_BUTTON_VARIANT.FILLED) {
    return colors.textInverted
  }

  return colors.primary
}

export const getContainerStyle = ({
  colors,
  disabled,
  variant,
}: {
  colors: ReturnType<typeof useThemeColors>
  disabled: boolean
  variant: IconButtonVariant
}): {
  backgroundColor: string
  borderColor: string
  borderWidth: number
} => {
  if (disabled) {
    return {
      backgroundColor:
        variant === ICON_BUTTON_VARIANT.FILLED ? colors.border : "transparent",
      borderColor: colors.border,
      borderWidth: variant === ICON_BUTTON_VARIANT.OUTLINED ? 1 : 0,
    }
  }

  if (variant === ICON_BUTTON_VARIANT.FILLED) {
    return {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 0,
    }
  }

  if (variant === ICON_BUTTON_VARIANT.OUTLINED) {
    return {
      backgroundColor: "transparent",
      borderColor: colors.primary,
      borderWidth: 1,
    }
  }

  return {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
  }
}
