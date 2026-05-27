import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { spacing } from "#design/foundations"

import TransactionCard from "./TransactionCard"
import { type TransactionListPropsType } from "./types"

export default function TransactionList({
  data,
  onTransactionPress,
}: TransactionListPropsType): ReactElement {
  return (
    <ScrollView style={styles.list} contentContainerStyle={styles.content}>
      {data?.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onPress={onTransactionPress}
        />
      ))}
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
})
