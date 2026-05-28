import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  THEME_PREFERENCE,
  useThemeColors,
  useThemePreference,
  type ThemePreference,
} from "#shared/theme"

const OPTIONS: Array<{ label: string; value: ThemePreference }> = [
  { label: "Light", value: THEME_PREFERENCE.LIGHT },
  { label: "Dark", value: THEME_PREFERENCE.DARK },
  { label: "System", value: THEME_PREFERENCE.SYSTEM },
]

export default function Profile(): ReactElement {
  const colors = useThemeColors()
  const { preference, setPreference } = useThemePreference()

  return (
    <Page scroll>
      <Card>
        <View style={styles.copy}>
          <Typography variant="title">Appearance</Typography>
          <Typography tone="muted">
            Choose how SitoWallet looks. System follows your device setting.
          </Typography>
        </View>

        <View style={styles.segments}>
          {OPTIONS.map((option) => {
            const active = preference === option.value
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  setPreference(option.value)
                }}
                style={[
                  styles.segment,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Typography
                  variant="label"
                  tone={active ? "inverted" : "default"}
                >
                  {option.label}
                </Typography>
              </Pressable>
            )
          })}
        </View>
      </Card>
    </Page>
  )
}

const styles = StyleSheet.create({
  copy: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  segments: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  segment: {
    alignItems: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
})
