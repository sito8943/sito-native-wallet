import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { TransactionCard } from "../TransactionCard"

import { type TransactionListPropsType } from "./types"

export default function TransactionList({
  data,
  emptyMessage = "No transactions available.",
  onTransactionPress,
}: TransactionListPropsType): ReactElement {
  return (
    <ScrollView style={styles.list} contentContainerStyle={styles.content}>
      {data?.length ? (
        data.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onPress={onTransactionPress}
          />
        ))
      ) : (
        <Typography style={styles.emptyMessage} tone="muted">
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
    paddingVertical: spacing.xs,
  },
  emptyMessage: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
})
