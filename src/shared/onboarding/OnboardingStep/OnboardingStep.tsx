import { type ReactElement } from "react"
import { View } from "react-native"

import Icon from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type OnboardingStepProps } from "./types"

export default function OnboardingStep({
  step,
  width,
  height,
}: OnboardingStepProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.iconWrap}>
        <Icon icon={step.icon} color={colors.primary} size={spacing(11)} />
      </View>

      <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY} style={styles.text}>
        {t(step.titleKey)}
      </Typography>

      <Typography
        variant={TYPOGRAPHY_VARIANT.BODY}
        tone={TYPOGRAPHY_TONE.MUTED}
        style={styles.text}
      >
        {t(step.bodyKey)}
      </Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    gap: spacing(5),
    justifyContent: "center" as const,
    paddingHorizontal: spacing(8),
  },
  iconWrap: {
    alignItems: "center" as const,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    height: spacing(24),
    justifyContent: "center" as const,
    width: spacing(24),
  },
  text: {
    textAlign: "center" as const,
  },
})
