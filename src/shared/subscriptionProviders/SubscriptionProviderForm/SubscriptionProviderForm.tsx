import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import TextField from "#design/elements/TextField"
import { spacing } from "#design/foundations"

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
  const { control, handleSubmit } = useForm<AddSubscriptionProviderDto>({
    defaultValues: defaultValues ?? EMPTY_SUBSCRIPTION_PROVIDER,
  })

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name is required",
          maxLength: {
            value: SUBSCRIPTION_PROVIDER_FIELD_LIMITS.NAME,
            message: `Max ${SUBSCRIPTION_PROVIDER_FIELD_LIMITS.NAME} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Name"
            placeholder="Netflix"
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
            message: `Max ${SUBSCRIPTION_PROVIDER_FIELD_LIMITS.WEBSITE} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Website"
            placeholder="https://netflix.com"
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
            message: `Max ${SUBSCRIPTION_PROVIDER_FIELD_LIMITS.DESCRIPTION} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Description"
            placeholder="Optional"
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
        <Button label={submitLabel} onPress={handleSubmit(onSubmit)} />

        {onDelete !== undefined && (
          <Button
            label="Delete"
            variant={BUTTON_VARIANT.DANGER}
            onPress={onDelete}
          />
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
