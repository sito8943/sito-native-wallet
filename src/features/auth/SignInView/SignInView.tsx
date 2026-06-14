import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/TextField"
import { spacing } from "#design/foundations"
import Form from "#design/patterns/Form"
import { useI18n } from "#shared/i18n"

import AuthError from "../AuthError"
import AuthHeader from "../AuthHeader"
import AuthLink from "../AuthLink"
import { EMAIL_PATTERN } from "../utils"

import { type SignInFormValues, type SignInViewProps } from "./types"

// Native sign-in form. Presentational: the screen owns what submit does (the
// data-loss confirmation, the client call, navigation) and passes it in.
export default function SignInView({
  onSubmit,
  onSignUp,
  onRecovery,
  loading = false,
  error,
}: SignInViewProps): ReactElement {
  const { t } = useI18n()
  const { control, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
  })

  return (
    <Form
      submitLabel={t("auth.signIn.submit")}
      submitLoading={loading}
      submitDisabled={loading}
      onSubmit={handleSubmit(onSubmit)}
      extraActions={
        <View style={styles.links}>
          <AuthLink
            question={t("auth.signIn.noAccount")}
            action={t("auth.signIn.signUpLink")}
            onPress={onSignUp}
          />
          <AuthLink
            action={t("auth.signIn.forgotPassword")}
            onPress={onRecovery}
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

      {error !== undefined && <AuthError message={error} />}
    </Form>
  )
}

const styles = StyleSheet.create({
  links: {
    gap: spacing(2),
  },
})
