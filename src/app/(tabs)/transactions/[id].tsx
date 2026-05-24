import { useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import { TransactionCard, useTransactions } from "#shared/wallet"

export default function TransactionDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data } = useTransactions()
  const transaction = data?.find((item) => item.id === id)

  if (transaction === undefined) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Transaction not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TransactionCard transaction={transaction} />

      <View style={styles.details}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>
          {transaction.amount.toFixed(2)} {transaction.currency.symbol}
        </Text>

        <Text style={styles.label}>Currency</Text>
        <Text style={styles.value}>{transaction.currency.name}</Text>

        <Text style={styles.label}>Categories</Text>
        <Text style={styles.value}>
          {transaction.categories.map((category) => category.name).join(", ")}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  details: {
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    color: "#666",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 12,
    textTransform: "uppercase",
  },
  value: {
    color: "#1f2933",
    fontSize: 16,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
})
