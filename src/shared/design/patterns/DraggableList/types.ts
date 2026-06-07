import { type ReactElement } from "react"
import { type StyleProp, type ViewStyle } from "react-native"
import { type SharedValue } from "react-native-reanimated"

export type DraggableListProps<T> = {
  data: T[]
  keyExtractor: (item: T) => string
  renderItem: (item: T) => ReactElement
  // Called on drop with the full key order after the move.
  onReorder: (orderedKeys: string[]) => void
  // Vertical space between rows; also feeds the drag stride.
  gap?: number
  header?: ReactElement
  refreshing?: boolean
  onRefresh?: () => void
  // Applied to the scrolling container; pass `flex: 1` to make the list fill a
  // bounded parent.
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
}

export type DraggableRowProps = {
  index: number
  count: number
  gap: number
  activeIndex: SharedValue<number>
  translationY: SharedValue<number>
  stride: SharedValue<number>
  onMeasure?: (height: number) => void
  onDragStart: () => void
  onDrop: (from: number, to: number) => void
  children: ReactElement
}
