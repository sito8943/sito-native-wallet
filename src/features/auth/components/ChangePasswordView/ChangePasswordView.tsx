import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import TextField from "#design/elements/TextField"
import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Form from "#design/patterns/Form"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import AuthError from "../../AuthError"

import { MIN_PASSWORD_LENGTH } from "./constants"
import {
  type ChangePasswordFormValues,
  type ChangePasswordViewProps,
} from "./types"

// Change the signed-in user's password: current password (re-auth) + the new
// one confirmed twice.
export default function ChangePasswordView({
  onSubmit,
  loading = false,
  error,
  done = false,
  onDone,
}: ChangePasswordViewProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const { control, handleSubmit, getValues } =
    useForm<ChangePasswordFormValues>({
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    })

  if (done) {
    return (
      <View style={styles.success}>
        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
          <Icon
            icon={APP_ICONS.check}
            color={colors.primary}
            size={spacing(8)}
          />
        </View>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.centered}>
          {t("auth.changePassword.doneTitle")}
        </Typography>
        {onDone !== undefined && (
          <Button
            accessibilityLabel={t("common.done")}
            variant={BUTTON_VARIANT.OUTLINED}
            onPress={onDone}
          >
            {t("common.done")}
          </Button>
        )}
      </View>
    )
  }

  return (
    <Form
      submitLabel={t("auth.changePassword.submit")}
      submitLoading={loading}
      submitDisabled={loading}
      onSubmit={handleSubmit(({ currentPassword, newPassword }) => {
        onSubmit({ currentPassword, newPassword })
      })}
    >
      <Controller
        control={control}
        name="currentPassword"
        rules={{ required: t("auth.validation.passwordRequired") }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.changePassword.current")}
            autoCapitalize="none"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        rules={{
          required: t("auth.validation.passwordRequired"),
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: t("auth.validation.passwordTooShort"),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.changePassword.new")}
            autoCapitalize="none"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: t("auth.validation.passwordRequired"),
          validate: (value) =>
            value === getValues("newPassword") ||
            t("auth.validation.passwordMismatch"),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.changePassword.confirm")}
            autoCapitalize="none"
            secureTextEntry
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
  centered: {
    textAlign: "center",
  },
})
