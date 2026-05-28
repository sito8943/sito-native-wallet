import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import { useThemeColors, useThemePreference } from "#shared/theme"

export default function Profile(): ReactElement {
  const colors = useThemeColors()
  const { preference, togglePreference } = useThemePreference()
  const nextPreference = preference === "light" ? "dark" : "light"

  return (
    <Page scroll>
      <Card>
        <View style={styles.row}>
          <View style={styles.copy}>
            <Typography variant="title">Appearance</Typography>
            <Typography tone="muted">
              Current theme: {preference}. Tap to switch to {nextPreference}.
            </Typography>
          </View>

          <Pressable
            onPress={togglePreference}
            style={[
              styles.toggle,
              {
                backgroundColor:
                  preference === "dark" ? colors.primary : colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.thumb,
                {
                  backgroundColor:
                    preference === "dark"
                      ? colors.textInverted
                      : colors.surface,
                  transform: [{ translateX: preference === "dark" ? 20 : 0 }],
                },
              ]}
            />
          </Pressable>
        </View>
      </Card>
    </Page>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  toggle: {
    borderRadius: 999,
    padding: 2,
    width: 44,
  },
  thumb: {
    borderRadius: 999,
    height: 20,
    width: 20,
  },
})
