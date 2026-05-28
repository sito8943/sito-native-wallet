import { type ReactElement } from "react"
import { View } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { type CategoryBulletProps } from "./types"

export default function CategoryBullet({
  color,
  name,
  style,
}: CategoryBulletProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <View style={[styles.container, style]}>
      {color && <View style={[styles.bullet, { backgroundColor: color }]} />}
      {name && <Typography variant="caption">{name}</Typography>}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    borderColor: colors.border,
    flexDirection: "row" as const,
    gap: spacing.xs,
  },
  bullet: {
    borderRadius: radius.full,
    borderWidth: 1,
    height: spacing.sm,
    width: spacing.sm,
  },
})
