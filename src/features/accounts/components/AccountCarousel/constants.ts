// Gap between cards, and the inset on each side of the centered card where the

import { spacing } from "#design/foundations"

// neighbouring cards peek through, so the user can tell the carousel scrolls.
export const GAP = spacing(2)
export const HALF_GAP = spacing(1)
export const SIDE = spacing(8)
// Leading/trailing content padding that, combined with each card's side margin,
// lands the snapped card centred (SIDE of peek on both sides).
export const PADDING = SIDE - HALF_GAP
