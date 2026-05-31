import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { TransactionCard } from "../TransactionCard"

import { type TransactionListProps } from "./types"

export default function TransactionList({
  data,
  emptyMessage = "No transactions available.",
  onPress,
  actionsFor,
}: TransactionListProps): ReactElement {
  return (
    <ScrollView style={styles.list} contentContainerStyle={styles.content}>
      {data?.length ? (
        data.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            actions={actionsFor?.(transaction)}
            onPress={onPress}
          />
        ))
      ) : (
        <Typography style={styles.emptyMessage} tone={TYPOGRAPHY_TONE.MUTED}>
          {emptyMessage}
        </Typography>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  content: {
    paddingVertical: spacing[2],
  },
  emptyMessage: {
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
  },
})
