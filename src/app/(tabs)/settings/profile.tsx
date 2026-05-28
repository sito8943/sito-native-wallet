import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  THEME_PREFERENCE,
  useThemedStyles,
  useThemePreference,
  type ThemeColors,
  type ThemePreference,
} from "#shared/theme"

const OPTIONS: Array<{ label: string; value: ThemePreference }> = [
  { label: "Light", value: THEME_PREFERENCE.LIGHT },
  { label: "Dark", value: THEME_PREFERENCE.DARK },
  { label: "System", value: THEME_PREFERENCE.SYSTEM },
]

export default function Profile(): ReactElement {
  const styles = useThemedStyles(createStyles)
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
                  active ? styles.segmentActive : styles.segmentInactive,
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

const createStyles = (colors: ThemeColors) => ({
  copy: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  segments: {
    flexDirection: "row" as const,
    gap: spacing.sm,
  },
  segment: {
    alignItems: "center" as const,
    borderRadius: radius.full,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  segmentActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  segmentInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
})
