import { spacing } from "#design/foundations"

export const SHEET_MAX_HEIGHT = "85%" as const

export const SHEET_PADDING_BOTTOM = spacing[8]

// Keyboard events driving the manual lift. keyboardDidShow/Hide fire after the
// frame settles, which is what we want for a static (non-animated) offset.
export const KEYBOARD_EVENT = {
  SHOW: "keyboardDidShow",
  HIDE: "keyboardDidHide",
} as const
