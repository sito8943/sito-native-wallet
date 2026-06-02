import { spacing } from "#design/foundations"

export const SHEET_MAX_HEIGHT = "85%" as const

export const SHEET_PADDING_BOTTOM = spacing(8)

// Keyboard events driving the manual lift. keyboardDidShow/Hide fire after the
// frame settles, which is what we want for a static (non-animated) offset.
export const KEYBOARD_EVENT = {
  SHOW: "keyboardDidShow",
  HIDE: "keyboardDidHide",
} as const

// Swipe-to-close gesture thresholds.
// Drag must move down past this before the gesture takes over (lets taps pass).
export const SWIPE_ACTIVATE_OFFSET = spacing(2)
// Release past this drag distance closes the sheet.
export const SWIPE_CLOSE_DISTANCE = spacing(24)
// ...or a fast enough downward flick (px per ms) closes it regardless.
export const SWIPE_CLOSE_VELOCITY = 1.2
// Duration of the slide-out before onClose fires.
export const SWIPE_CLOSE_DURATION = 200
