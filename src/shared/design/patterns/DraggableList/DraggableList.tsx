import { type ReactElement, useCallback, useState } from "react"
import { RefreshControl, ScrollView, StyleSheet } from "react-native"

import Animated, { useSharedValue } from "react-native-reanimated"

import { spacing } from "#design/foundations"

import { DraggableRow } from "./DragrableRow"
import { type DraggableListProps } from "./types"

// Long-press a row to drag it; the dragged row follows the finger while the
// others slide to open a slot. Drops commit the new order via onReorder. Rows
// are assumed uniform height (measured from the first one) — fine for a short
// list of equal cards. Not virtualized, so keep lists small.
export default function DraggableList<T>({
  data,
  keyExtractor,
  renderItem,
  onReorder,
  gap = spacing(4),
  header,
  refreshing,
  onRefresh,
  style,
  contentStyle,
}: DraggableListProps<T>): ReactElement {
  const activeIndex = useSharedValue(-1)
  const translationY = useSharedValue(0)
  const stride = useSharedValue(0)
  const [dragging, setDragging] = useState(false)

  const handleDragStart = useCallback(() => {
    setDragging(true)
  }, [])

  const handleDrop = useCallback(
    (from: number, to: number) => {
      setDragging(false)
      if (from === to) {
        return
      }

      const keys = data.map(keyExtractor)
      const [moved] = keys.splice(from, 1)
      keys.splice(to, 0, moved)
      onReorder(keys)
    },
    [data, keyExtractor, onReorder],
  )

  const handleMeasure = useCallback(
    (height: number) => {
      stride.value = height + gap
    },
    [gap, stride],
  )

  return (
    <ScrollView
      style={style}
      contentContainerStyle={[styles.content, contentStyle]}
      refreshControl={
        onRefresh === undefined ? undefined : (
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
          />
        )
      }
      scrollEnabled={!dragging}
      showsVerticalScrollIndicator={false}
    >
      {header !== undefined && (
        <Animated.View style={{ marginBottom: gap }}>{header}</Animated.View>
      )}

      {data.map((item, index) => (
        <DraggableRow
          key={keyExtractor(item)}
          activeIndex={activeIndex}
          count={data.length}
          gap={gap}
          index={index}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onMeasure={index === 0 ? handleMeasure : undefined}
          stride={stride}
          translationY={translationY}
        >
          {renderItem(item)}
        </DraggableRow>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: spacing(2),
  },
})
