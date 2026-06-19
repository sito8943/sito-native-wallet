import { type ReactNode } from "react"

export type CardDisplaySectionProps = {
  // Base display option every card shares: render the active-filter chips in the
  // card header.
  showFiltersAsBadge: boolean
  onToggleFiltersBadge: () => void
  // Card-specific display toggles (e.g. TypeResume's "show opposite type"),
  // rendered alongside the shared "show filters" chip.
  children?: ReactNode
}
