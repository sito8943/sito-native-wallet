import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import EntityCard from "#design/patterns/EntityCard"

import { CategoryBullet } from "../CategoryBullet"

import { type CategoryCardProps } from "./types"

export default function CategoryCard({
  category,
  actions,
  onPress,
}: CategoryCardProps): ReactElement {
  return (
    <EntityCard actions={actions} entity={category} onPress={onPress}>
      <View style={styles.row}>
        <CategoryBullet {...category} />
        <Typography
          variant={TYPOGRAPHY_VARIANT.LABEL}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {category.type}
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
