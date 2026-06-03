import { type ReactElement } from "react"
import { View } from "react-native"

import Typography from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

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
      {name && (
        <Typography variant={TYPOGRAPHY_VARIANT.CAPTION}>{name}</Typography>
      )}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    borderColor: colors.border,
    flexDirection: "row" as const,
    gap: spacing(2),
  },
  bullet: {
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    borderColor: colors.border,
    height: spacing(3),
    width: spacing(3),
  },
})
