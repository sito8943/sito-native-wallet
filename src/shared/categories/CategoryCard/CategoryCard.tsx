import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"

import { CategoryBullet } from "../CategoryBullet"
import { TransactionType } from "../TransactionCategory"

import { type CategoryCardProps } from "./types"

export default function CategoryCard({
  category,
}: CategoryCardProps): ReactElement {
  return (
    <Card>
      <View style={styles.row}>
        <CategoryBullet category={category} />
        <Typography variant="label" tone="muted">
          {category.type === TransactionType.In ? "income" : "expense"}
        </Typography>
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
