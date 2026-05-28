import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"

import { useThemeColors } from "#shared/theme"

import { type CategoryBulletProps } from "./types"

export default function CategoryBullet({
  color,
  name,
  style,
}: CategoryBulletProps): ReactElement {
  const colors = useThemeColors()

  return (
    <View style={[styles.container, style, { borderColor: colors.border }]}>
      {color && <View style={[styles.bullet, { backgroundColor: color }]} />}
      {name && <Typography variant="caption">{name}</Typography>}
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
    borderRadius: radius.full,
    borderWidth: 1,
    height: spacing.sm,
    width: spacing.sm,
  },
})
