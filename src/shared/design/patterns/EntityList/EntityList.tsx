import { type ReactElement } from "react"
import { FlatList, StyleSheet } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type EntityListProps } from "./types"

// Generic virtualized list (FlatList): only renders what's on screen and drives
// infinite pagination via onEndReached. Each screen passes its own card through
// renderItem; the scroll container, empty state and header are shared.
export default function EntityList<T extends { id: string }>({
  data,
  renderItem,
  keyExtractor,
  emptyMessage = "Nothing here yet.",
  header,
  onEndReached,
  contentContainerStyle,
}: EntityListProps<T>): ReactElement {
  return (
    <FlatList<T>
      data={data ?? []}
      keyExtractor={keyExtractor ?? ((item) => item.id)}
      renderItem={({ item }) => renderItem(item)}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Typography style={styles.empty} tone={TYPOGRAPHY_TONE.MUTED}>
          {emptyMessage}
        </Typography>
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
    paddingVertical: spacing(2),
  },
  empty: {
    marginHorizontal: spacing(4),
    marginTop: spacing(4),
  },
})
