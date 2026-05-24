import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "#shared/design/Card"

import { type CurrencyCardPropsType } from "./types"

export default function CurrencyCard({
  currency,
}: CurrencyCardPropsType): ReactElement {
  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.name}>{currency.name}</Text>
        <Text style={styles.symbol}>{currency.symbol}</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
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
