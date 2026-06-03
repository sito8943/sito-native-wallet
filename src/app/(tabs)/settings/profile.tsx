import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import Page from "#design/templates/Page"
import {
  THEME_PREFERENCE,
  useThemedStyles,
  useThemePreference,
  type ThemeColors,
  type ThemePreference,
} from "#design/theme"

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
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>Appearance</Typography>
          <Typography tone={TYPOGRAPHY_TONE.MUTED}>
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
                  variant={TYPOGRAPHY_VARIANT.LABEL}
                  tone={
                    active ? TYPOGRAPHY_TONE.INVERTED : TYPOGRAPHY_TONE.DEFAULT
                  }
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
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  segments: {
    flexDirection: "row" as const,
    gap: spacing[3],
  },
  segment: {
    alignItems: "center" as const,
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    flex: 1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
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
