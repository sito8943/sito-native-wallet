import { type ReactElement } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Typography, { TYPOGRAPHY_VARIANT } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import useIsOnline from "./useIsOnline"

export default function OfflineBanner(): ReactElement | null {
  const styles = useThemedStyles(createStyles)
  const insets = useSafeAreaInsets()
  const isOnline = useIsOnline()
  const { t } = useI18n()

  if (isOnline) return null

  return (
    <View style={[styles.banner, { paddingTop: insets.top + spacing(2) }]}>
      <Typography style={styles.text} variant={TYPOGRAPHY_VARIANT.LABEL}>
        {t("common.offline")}
      </Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  banner: {
    alignItems: "center" as const,
    backgroundColor: colors.negative,
    paddingHorizontal: spacing(4),
    paddingBottom: spacing(2),
    width: "100%" as const,
  },
  text: {
    color: colors.surface,
  },
})
