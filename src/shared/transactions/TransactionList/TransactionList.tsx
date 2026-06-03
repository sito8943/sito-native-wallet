import { type ReactElement } from "react"
import { FlatList, StyleSheet } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { TransactionCard } from "../TransactionCard"

import { type TransactionListProps } from "./types"

// Virtualized list (FlatList) so large transaction histories only render what's
// on screen. onEndReached drives infinite pagination when provided.
export default function TransactionList({
  data,
  emptyMessage = "No transactions available.",
  onPress,
  actionsFor,
  onEndReached,
  header,
}: TransactionListProps): ReactElement {
  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(transaction) => transaction.id}
      renderItem={({ item }) => (
        <TransactionCard
          transaction={item}
          actions={actionsFor?.(item)}
          onPress={onPress}
        />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Typography style={styles.emptyMessage} tone={TYPOGRAPHY_TONE.MUTED}>
          {emptyMessage}
        </Typography>
      }
      style={styles.list}
      contentContainerStyle={styles.content}
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
  emptyMessage: {
    marginHorizontal: spacing(4),
    marginTop: spacing(4),
  },
})
