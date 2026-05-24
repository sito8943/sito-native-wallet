import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { CurrencyCard, useTransactions } from "#shared/wallet"

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
        <CurrencyCard key={currency.id} currency={currency} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
})
