import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import TransactionCard from "./TransactionCard"
import { type Transaction } from "./types"

export default function TransactionList({
  data,
}: {
  data?: Transaction[]
}): ReactElement {
  return (
    <ScrollView style={styles.list}>
      {data?.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
})
