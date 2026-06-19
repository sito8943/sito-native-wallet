import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import AuthLink from "../AuthLink"

import { type SignUpConfirmationViewProps } from "./types"

// Post sign-up screen: tells the user to check their inbox to confirm the
// email (the confirmation link itself is handled by the web wallet) and lets
// them resend it or go back to sign-in.
export default function SignUpConfirmationView({
  email,
  onResend,
  onBackToSignIn,
  resending = false,
}: SignUpConfirmationViewProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: colors.surface }]}>
        <Icon icon={APP_ICONS.check} color={colors.primary} size={spacing(8)} />
      </View>

      <View style={styles.copy}>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.centered}>
          {t("auth.confirm.title")}
        </Typography>
        <Typography
          tone={TYPOGRAPHY_TONE.MUTED}
          variant={TYPOGRAPHY_VARIANT.BODY}
          style={styles.centered}
        >
          {t("auth.confirm.message", { email })}
        </Typography>
      </View>

      <Button
        accessibilityLabel={t("auth.confirm.resend")}
        variant={BUTTON_VARIANT.OUTLINED}
        loading={resending}
        disabled={resending}
        onPress={onResend}
      >
        {t("auth.confirm.resend")}
      </Button>

      <AuthLink
        action={t("auth.confirm.backToSignIn")}
        onPress={onBackToSignIn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing(5),
  },
  badge: {
    alignItems: "center",
    borderRadius: radius.full,
    height: spacing(18),
    justifyContent: "center",
    width: spacing(18),
  },
  copy: {
    gap: spacing(2),
  },
  centered: {
    textAlign: "center",
  },
})
