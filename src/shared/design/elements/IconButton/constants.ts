import { spacing } from "#design/foundations"

import { type IconButtonSize } from "./types"

export const ICON_BUTTON_VARIANT = {
  FILLED: "filled",
  OUTLINED: "outlined",
  TEXT: "text",
} as const

export const ICON_BUTTON_SIZE = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const

export const BUTTON_SIZES: Record<
  IconButtonSize,
  { iconSize: number; minSize: number; padding: number }
> = {
  [ICON_BUTTON_SIZE.SM]: {
    iconSize: 14,
    minSize: 32,
    padding: spacing.xs,
  },
  [ICON_BUTTON_SIZE.MD]: {
    iconSize: 16,
    minSize: 40,
    padding: spacing.sm,
  },
  [ICON_BUTTON_SIZE.LG]: {
    iconSize: 18,
    minSize: 48,
    padding: spacing.md,
  },
}
