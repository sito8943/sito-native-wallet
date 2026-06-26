import { type ReactElement } from "react"
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native"

import { type EmptyAction } from "#design/templates/Empty"

export type EntityListProps<T extends { id: number }> = {
  data?: T[] | null
  renderItem: (item: T) => ReactElement
  // Defaults to item.id; override for entities keyed differently.
  keyExtractor?: (item: T) => string
  emptyMessage?: string
  // Call-to-action button(s) shown under the empty message (e.g. "add from
  // templates"). Ignored when emptyComponent is provided.
  emptyActions?: EmptyAction[]
  emptyComponent?: ReactElement
  // Rendered above the list inside the same virtualized scroll container.
  header?: ReactElement
  // Called as the user nears the end — drives infinite pagination. Omit for a
  // plain (non-paginated) list.
  onEndReached?: () => void
  // Swipe-to-delete: return a per-row handler to enable it, undefined to skip.
  onSwipeDelete?: (item: T) => (() => void) | undefined
  contentContainerStyle?: StyleProp<ViewStyle>
  // Scroll passthrough: lets a screen drive scroll-linked UI (e.g. a collapsing
  // header) off the same virtualized container.
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollEventThrottle?: number
}
