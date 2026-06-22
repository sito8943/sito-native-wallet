import { type ReactNode } from "react"

export type CardDisplaySectionProps = {
  // Base display option every card shares: replace active-filter chips with a
  // numeric badge over the filter button.
  showFiltersAsBadge: boolean
  onToggleFiltersBadge: () => void
  // Card-specific display toggles (e.g. TypeResume's "show opposite type"),
  // rendered alongside the shared "show filter count" chip.
  children?: ReactNode
}
