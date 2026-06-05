import { type ReactNode } from "react"

export type SwipeableRowProps = {
  children: ReactNode
  // Fired on swipe-commit; callers confirm in a dialog, not delete outright.
  onDelete: () => void
  disabled?: boolean
}
