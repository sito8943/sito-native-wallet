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
    iconSize: spacing[3],
    minSize: spacing[8],
    padding: spacing[2],
  },
  [ICON_BUTTON_SIZE.MD]: {
    iconSize: spacing[3],
    minSize: spacing[10],
    padding: spacing[3],
  },
  [ICON_BUTTON_SIZE.LG]: {
    iconSize: spacing[4],
    minSize: spacing[12],
    padding: spacing[4],
  },
}
