import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { colors, radius, shadows, spacing } from "#design/foundations"

import { type CardPropsType } from "./types"

export default function Card({
  children,
  style,
}: CardPropsType): ReactElement {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.md + 2,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
})
