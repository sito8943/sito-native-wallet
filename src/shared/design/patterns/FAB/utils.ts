import { type EdgeInsets } from "react-native-safe-area-context"

import {
  ICON_BUTTON_VARIANT,
  type IconButtonVariant,
} from "#design/elements/IconButton"
import { type useThemeColors } from "#design/theme"

import {
  EDGE_HORIZONTAL_GAP,
  EDGE_VERTICAL_GAP,
  FAB_POSITION,
} from "./constants"
import { type FabPosition } from "./types"

// Absolute offsets from screen edges, respecting safe-area insets.
export function getPositionStyle(
  position: FabPosition,
  insets: EdgeInsets,
): { bottom?: number; left?: number; right?: number; top?: number } {
  const vertical =
    position === FAB_POSITION.TOP_RIGHT || position === FAB_POSITION.TOP_LEFT
      ? { top: insets.top + EDGE_VERTICAL_GAP }
      : { bottom: insets.bottom + EDGE_VERTICAL_GAP }

  const horizontal =
    position === FAB_POSITION.BOTTOM_LEFT || position === FAB_POSITION.TOP_LEFT
      ? { left: insets.left + EDGE_HORIZONTAL_GAP }
      : { right: insets.right + EDGE_HORIZONTAL_GAP }

  return { ...vertical, ...horizontal }
}

// Label color must match IconButton's icon color for the given variant.
export function getLabelColor({
  colors,
  disabled,
  variant,
}: {
  colors: ReturnType<typeof useThemeColors>
  disabled: boolean
  variant: IconButtonVariant
}): string {
  if (disabled) {
    return colors.textSubtle
  }

  if (variant === ICON_BUTTON_VARIANT.FILLED) {
    return colors.textInverted
  }

  return colors.primary
}
