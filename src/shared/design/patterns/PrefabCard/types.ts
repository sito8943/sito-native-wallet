import { type ReactNode } from "react"

export type PrefabCardProps = {
  selected: boolean
  onPress: () => void
  // Right-hand content shown before the selection check (symbol, badge, …).
  trailing?: ReactNode
  // Left-hand content of the row (name, description, …).
  children: ReactNode
}
