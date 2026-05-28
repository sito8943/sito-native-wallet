import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"

import { CategoryBullet } from "../CategoryBullet"

import { type CategoryCardProps } from "./types"

export default function CategoryCard({
  category,
}: CategoryCardProps): ReactElement {
  return (
    <Card>
      <View style={styles.row}>
        <CategoryBullet {...category} />
        <Typography
          variant={TYPOGRAPHY_VARIANT.LABEL}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {category.type}
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
