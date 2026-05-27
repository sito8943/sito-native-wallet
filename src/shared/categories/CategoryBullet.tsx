import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"

import { type CategoryBulletPropsType } from "./types"

export default function CategoryBullet({
  category,
}: CategoryBulletPropsType): ReactElement {
  return (
    <View style={styles.container}>
      <View style={[styles.bullet, { backgroundColor: category.color }]} />
      <Typography variant="caption">{category.name}</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  bullet: {
    borderRadius: radius.sm,
    height: spacing.xs,
    width: spacing.xs,
  },
})
