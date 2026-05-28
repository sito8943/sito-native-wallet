import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"

import { type CurrencyCardProps } from "./types"

export default function CurrencyCard({
  currency,
}: CurrencyCardProps): ReactElement {
  return (
    <Card>
      <View style={styles.row}>
        <Typography variant="title">{currency.name}</Typography>
        <Typography variant="subtle">{currency.symbol}</Typography>
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
})
