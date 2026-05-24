import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { TransactionCard } from "./components"
import { type Transaction } from "./lib/models/Wallet"

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
