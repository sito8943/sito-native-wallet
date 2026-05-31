import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import EntityCard from "#design/patterns/EntityCard"

import { type CurrencyCardProps } from "./types"

export default function CurrencyCard({
  currency,
  actions,
  onPress,
}: CurrencyCardProps): ReactElement {
  return (
    <EntityCard actions={actions} entity={currency} onPress={onPress}>
      <View style={styles.row}>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
          {currency.name}
        </Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.SUBTLE}>
          {currency.symbol}
        </Typography>
      </View>
    </EntityCard>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
