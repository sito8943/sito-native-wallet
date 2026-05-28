import { type useThemeColors } from "#shared/theme"

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

  if (variant === "filled") {
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
      backgroundColor: variant === "filled" ? colors.border : "transparent",
      borderColor: colors.border,
      borderWidth: variant === "outlined" ? 1 : 0,
    }
  }

  if (variant === "filled") {
    return {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 0,
    }
  }

  if (variant === "outlined") {
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
