import { type IconProp } from "@fortawesome/fontawesome-svg-core"

import { type ThemeColorName } from "#design/theme"

// Entity-aware action descriptor. onPress receives the row it operates on, so
// the same descriptor works for any item in a list. Mirrors ActionType from
// @sito/dashboard, trimmed for RN (no tooltip/multiple). icon is an APP_ICONS
// value, rendered through our Icon element; color is a THEME_COLOR.
export type Action<T> = {
  id: number
  icon: IconProp
  accessibilityLabel: string
  onPress: (entity: T) => void
  color?: ThemeColorName
  disabled?: boolean
  hidden?: boolean
  // Pinned actions render as a visible icon button; the rest (default) collapse
  // into the overflow (3-dots) menu. See ActionMenu.
  sticky?: boolean
}
