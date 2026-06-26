import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/TextField"
import { spacing } from "#design/foundations"
import Form from "#design/patterns/Form"
import { useI18n } from "#shared/i18n"

import AuthError from "../../AuthError"
import { EMAIL_PATTERN } from "../../utils"
import AuthHeader from "../AuthHeader"
import AuthLink from "../AuthLink"

import { type SignUpFormValues, type SignUpViewProps } from "./types"

// Native sign-up form. Validates the password match here (mirrors the web
// view) and only forwards matching values; the screen owns the rest.
export default function SignUpView({
  onSubmit,
  onSignIn,
  loading = false,
  error,
}: SignUpViewProps): ReactElement {
  const { t } = useI18n()
  const { control, handleSubmit, setError } = useForm<SignUpFormValues>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const submit = handleSubmit((values) => {
    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: t("auth.validation.passwordMismatch"),
      })
      return
    }

    onSubmit(values)
  })

  return (
    <Form
      submitLabel={t("auth.signUp.submit")}
      submitLoading={loading}
      submitDisabled={loading}
      onSubmit={submit}
      extraActions={
        <View style={styles.links}>
          <AuthLink
            question={t("auth.signUp.haveAccount")}
            action={t("auth.signUp.signInLink")}
            onPress={onSignIn}
          />
        </View>
      }
    >
      <AuthHeader />

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

      <Controller
        control={control}
        name="password"
        rules={{ required: t("auth.validation.passwordRequired") }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.field.password")}
            placeholder={t("auth.field.passwordPlaceholder")}
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
        rules={{ required: t("auth.validation.confirmRequired") }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("auth.field.confirmPassword")}
            placeholder={t("auth.field.confirmPasswordPlaceholder")}
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
  links: {
    gap: spacing(2),
  },
})
