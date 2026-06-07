import { type ReactElement } from "react"
import { View } from "react-native"

import { radius, shadows, spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

import { type CardProps } from "./types"

export default function Card({ children, style }: CardProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return <View style={[styles.container, style]}>{children}</View>
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    backgroundColor: colors.surface,
    padding: spacing(3),
    borderRadius: radius.md,
    ...shadows.card,
  },
})
