import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { radius, shadows, spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { type CardPropsType } from "./types"

export default function Card({ children, style }: CardPropsType): ReactElement {
  const colors = useThemeColors()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface }, style]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    ...shadows.card,
  },
})
