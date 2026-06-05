import { type ReactElement } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

export type EntityListProps<T extends { id: number }> = {
  data?: T[] | null
  renderItem: (item: T) => ReactElement
  // Defaults to item.id; override for entities keyed differently.
  keyExtractor?: (item: T) => string
  emptyMessage?: string
  emptyComponent?: ReactElement
  // Rendered above the list inside the same virtualized scroll container.
  header?: ReactElement
  // Called as the user nears the end — drives infinite pagination. Omit for a
  // plain (non-paginated) list.
  onEndReached?: () => void
  // Swipe-to-delete: return a per-row handler to enable it, undefined to skip.
  onSwipeDelete?: (item: T) => (() => void) | undefined
  contentContainerStyle?: StyleProp<ViewStyle>
}
