import { type ReactElement } from "react"
import { FlatList, StyleSheet } from "react-native"

import { spacing } from "#design/foundations"
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
  emptyComponent,
  header,
  onEndReached,
  contentContainerStyle,
}: EntityListProps<T>): ReactElement {
  const { t } = useI18n()

  return (
    <FlatList<T>
      data={data ?? []}
      keyExtractor={keyExtractor ?? ((item) => item.id.toString())}
      renderItem={({ item }) => renderItem(item)}
      ListHeaderComponent={header}
      ListEmptyComponent={
        emptyComponent ?? <Empty message={emptyMessage ?? t("common.empty")} />
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
