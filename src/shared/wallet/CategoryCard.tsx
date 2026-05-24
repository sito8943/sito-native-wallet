import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "#shared/design/Card"

import CategoryBullet from "./CategoryBullet"
import { type CategoryCardPropsType, TransactionType } from "./types"

export default function CategoryCard({
  category,
}: CategoryCardPropsType): ReactElement {
  return (
    <Card>
      <View style={styles.row}>
        <CategoryBullet category={category} />
        <Text style={styles.type}>
          {category.type === TransactionType.In ? "income" : "expense"}
        </Text>
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
  type: {
    color: "#666",
    fontSize: 12,
    fontWeight: "700",
  },
})
