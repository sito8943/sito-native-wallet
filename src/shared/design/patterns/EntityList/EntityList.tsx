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
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  content: {
    gap: spacing(4),
    paddingVertical: spacing(2),
  },
})
