import { type ReactNode } from "react"

export type CardFrameProps = {
  title: string | null
  placeholder: string
  onRename: (title: string) => void
  onOpenFilters: () => void
  onDelete: () => void
  // Number rendered over the filter button while badge mode is enabled.
  filterBadgeCount?: number
  // Tappable summary of the active filters (opens the config sheet).
  activeFilters?: ReactNode
  // The card's value content.
  children: ReactNode
}
