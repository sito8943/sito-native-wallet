import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import TextField from "#design/elements/TextField"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Form from "#design/patterns/Form"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import AuthError from "../../AuthError"
import { EMAIL_PATTERN } from "../../utils"
import AuthHeader from "../AuthHeader"
import AuthLink from "../AuthLink"

import { type RecoveryFormValues, type RecoveryViewProps } from "./types"

// Native "forgot password" request: enter the account email and the backend
// sends a reset link. The link itself completes on the web wallet (token-based).
export default function RecoveryView({
  onSubmit,
  onBackToSignIn,
  loading = false,
  error,
  sent = false,
}: RecoveryViewProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const { control, handleSubmit } = useForm<RecoveryFormValues>({
    defaultValues: { email: "" },
  })

  if (sent) {
    return (
      <View style={styles.success}>
        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
          <Icon
            icon={APP_ICONS.check}
            color={colors.primary}
            size={spacing(8)}
          />
        </View>
        <View style={styles.copy}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.TITLE}
            style={styles.centered}
          >
            {t("auth.recovery.sentTitle")}
          </Typography>
          <Typography
            tone={TYPOGRAPHY_TONE.MUTED}
            variant={TYPOGRAPHY_VARIANT.BODY}
            style={styles.centered}
          >
            {t("auth.recovery.sentMessage")}
          </Typography>
        </View>
        <AuthLink
          action={t("auth.recovery.backToSignIn")}
          onPress={onBackToSignIn}
        />
      </View>
    )
  }

  return (
    <Form
      submitLabel={t("auth.recovery.submit")}
      submitLoading={loading}
      submitDisabled={loading}
      onSubmit={handleSubmit((values) => {
        onSubmit(values.email)
      })}
      extraActions={
        <AuthLink
          action={t("auth.recovery.backToSignIn")}
          onPress={onBackToSignIn}
        />
      }
    >
      <AuthHeader />

      <Typography
        tone={TYPOGRAPHY_TONE.MUTED}
        variant={TYPOGRAPHY_VARIANT.BODY}
        style={styles.centered}
      >
        {t("auth.recovery.description")}
      </Typography>

      <Controller
        control={control}
        name="email"
        rules={{
          required: t("auth.validation.emailRequired"),
          pattern: {
            value: EMAIL_PATTERN,
            message: t("auth.validation.emailInvalid"),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.field.email")}
            placeholder={t("auth.field.emailPlaceholder")}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      {error !== undefined && <AuthError message={error} />}
    </Form>
  )
}

const styles = StyleSheet.create({
  success: {
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
