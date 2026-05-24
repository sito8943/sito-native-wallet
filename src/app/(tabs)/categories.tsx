import { type ReactElement } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "#shared/design/Card"
import { CategoryBullet, TransactionType, useTransactions } from "#shared/wallet"

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
        <Card key={category.id}>
          <View style={styles.row}>
            <CategoryBullet category={category} />
            <Text style={styles.type}>
              {category.type === TransactionType.In ? "income" : "expense"}
            </Text>
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
  type: {
    color: "#666",
    fontSize: 12,
    fontWeight: "700",
  },
})
