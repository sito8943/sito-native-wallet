import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import { type CategoryBulletPropsType } from "./types"

export default function CategoryBullet({
  category,
}: CategoryBulletPropsType): ReactElement {
  return (
    <View style={styles.container}>
      <View style={[styles.bullet, { backgroundColor: category.color }]} />
      <Text style={styles.label}>{category.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  bullet: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  label: {
    color: "#666",
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
  },
})
