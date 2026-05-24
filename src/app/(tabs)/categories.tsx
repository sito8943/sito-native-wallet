import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { CategoryCard, useTransactions } from "#shared/wallet"

export default function Categories(): ReactElement {
  const { data } = useTransactions()
  const categories = [
    ...new Map(
      data
        ?.flatMap((transaction) => transaction.categories)
        .map((category) => [category.id, category]) ?? [],
    ).values(),
  ]

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
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
