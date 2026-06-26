import { type ReactElement } from "react"
import { FlatList, StyleSheet } from "react-native"

import { spacing } from "#design/foundations"
import SwipeableRow from "#design/patterns/SwipeableRow"
import Empty from "#design/templates/Empty"
import { useI18n } from "#shared/i18n"

import { type EntityListProps } from "./types"

// Generic virtualized list (FlatList): only renders what's on screen and drives
// infinite pagination via onEndReached. Each screen passes its own card through
// renderItem; the scroll container, empty state and header are shared.
export default function EntityList<T extends { id: number }>({
  data,
  renderItem,
  keyExtractor,
  emptyMessage,
  emptyActions,
  emptyComponent,
  header,
  onEndReached,
  onSwipeDelete,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle,
}: EntityListProps<T>): ReactElement {
  const { t } = useI18n()

  const renderRow = (item: T): ReactElement => {
    const row = renderItem(item)
    if (onSwipeDelete === undefined) {
      return row
    }

    const onDelete = onSwipeDelete(item)
    if (onDelete === undefined) {
      return row
    }

    return <SwipeableRow onDelete={onDelete}>{row}</SwipeableRow>
  }

  return (
    <FlatList<T>
      data={data ?? []}
      keyExtractor={keyExtractor ?? ((item) => item.id.toString())}
      renderItem={({ item }) => renderRow(item)}
      ListHeaderComponent={header}
      ListEmptyComponent={
        emptyComponent ?? (
          <Empty
            message={emptyMessage ?? t("common.empty")}
            actions={emptyActions}
          />
        )
      }
      style={styles.list}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    />
  )
}

const styles = StyleSheet.create({
  // Reach the screen edges (cancel the Page's horizontal padding) and re-inset
  // the rows via content padding, so the FlatList frame doesn't clip each card's
  // side shadow. Assumes the standard Page horizontal padding (spacing(4)).
  list: {
    flex: 1,
    marginHorizontal: -spacing(4),
  },
  content: {
    gap: spacing(4),
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(4),
  },
})
