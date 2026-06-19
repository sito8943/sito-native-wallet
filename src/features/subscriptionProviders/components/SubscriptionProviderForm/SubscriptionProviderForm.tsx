import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import TextField from "#design/elements/TextField"
import { spacing } from "#design/foundations"
import { useI18n } from "#shared/i18n"

import { type AddSubscriptionProviderDto } from "../dtos"

import {
  EMPTY_SUBSCRIPTION_PROVIDER,
  SUBSCRIPTION_PROVIDER_FIELD_LIMITS,
} from "./constants"
import { type SubscriptionProviderFormProps } from "./types"

export default function SubscriptionProviderForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: SubscriptionProviderFormProps): ReactElement {
  const { t } = useI18n()
  const { control, handleSubmit } = useForm<AddSubscriptionProviderDto>({
    defaultValues: defaultValues ?? EMPTY_SUBSCRIPTION_PROVIDER,
  })

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: t("form.validation.required.name"),
          maxLength: {
            value: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.NAME,
            message: t("form.validation.maxCharacters", {
              max: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.NAME,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.subscriptionProvider.name")}
            placeholder={t("form.subscriptionProvider.name.placeholder")}
            autoCapitalize="words"
            maxLength={SUBSCRIPTION_PROVIDER_FIELD_LIMITS.NAME}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="website"
        rules={{
          maxLength: {
            value: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.WEBSITE,
            message: t("form.validation.maxCharacters", {
              max: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.WEBSITE,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.subscriptionProvider.website")}
            placeholder={t("form.subscriptionProvider.website.placeholder")}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            maxLength={SUBSCRIPTION_PROVIDER_FIELD_LIMITS.WEBSITE}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{
          maxLength: {
            value: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.DESCRIPTION,
            message: t("form.validation.maxCharacters", {
              max: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.DESCRIPTION,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.subscriptionProvider.description")}
            placeholder={t("form.subscriptionProvider.description.placeholder")}
            multiline
            maxLength={SUBSCRIPTION_PROVIDER_FIELD_LIMITS.DESCRIPTION}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <View style={styles.actions}>
        <Button
          accessibilityLabel={submitLabel}
          onPress={handleSubmit(onSubmit)}
        >
          {submitLabel}
        </Button>

        {onDelete !== undefined && (
          <Button
            accessibilityLabel={t("common.delete")}
            variant={BUTTON_VARIANT.DANGER}
            onPress={onDelete}
          >
            {t("common.delete")}
          </Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing(4),
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
  },
  actions: {
    flexDirection: "row",
    gap: spacing(4),
    marginTop: spacing(4),
  },
})
