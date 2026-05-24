import { type ReactElement } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "#shared/design/Card"
import { useTransactions } from "#shared/wallet"

export default function Currencies(): ReactElement {
  const { data } = useTransactions()
  const currencies = [
    ...new Map(
      data?.map((transaction) => [
        transaction.currency.id,
        transaction.currency,
      ]) ?? [],
    ).values(),
  ]

  return (
    <ScrollView style={styles.container}>
      {currencies.map((currency) => (
        <Card key={currency.id}>
          <View style={styles.row}>
            <Text style={styles.name}>{currency.name}</Text>
            <Text style={styles.symbol}>{currency.symbol}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: "#1f2933",
    fontSize: 18,
    fontWeight: "700",
  },
  symbol: {
    color: "#666",
    fontSize: 14,
    fontWeight: "700",
  },
})
