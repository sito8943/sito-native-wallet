import { spacing } from "#design/foundations"

import { type IconButtonSize } from "./types"

export const BUTTON_SIZES: Record<
  IconButtonSize,
  { iconSize: number; minSize: number; padding: number }
> = {
  sm: {
    iconSize: 14,
    minSize: 32,
    padding: spacing.xs,
  },
  md: {
    iconSize: 16,
    minSize: 40,
    padding: spacing.sm,
  },
  lg: {
    iconSize: 18,
    minSize: 48,
    padding: spacing.md,
  },
}
