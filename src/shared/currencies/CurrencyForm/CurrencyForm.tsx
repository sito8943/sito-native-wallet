import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import TextField from "#design/elements/TextField"
import { spacing } from "#design/foundations"

import { type AddCurrencyDto } from "../dtos"

import { CURRENCY_FIELD_LIMITS, EMPTY_CURRENCY } from "./constants"
import { type CurrencyFormProps } from "./types"

export default function CurrencyForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: CurrencyFormProps): ReactElement {
  const { control, handleSubmit } = useForm<AddCurrencyDto>({
    defaultValues: defaultValues ?? EMPTY_CURRENCY,
  })

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name is required",
          maxLength: {
            value: CURRENCY_FIELD_LIMITS.NAME,
            message: `Max ${CURRENCY_FIELD_LIMITS.NAME} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Name"
            placeholder="Euro"
            autoCapitalize="words"
            maxLength={CURRENCY_FIELD_LIMITS.NAME}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="symbol"
        rules={{
          required: "Symbol is required",
          maxLength: {
            value: CURRENCY_FIELD_LIMITS.SYMBOL,
            message: `Max ${CURRENCY_FIELD_LIMITS.SYMBOL} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Symbol"
            placeholder="€"
            maxLength={CURRENCY_FIELD_LIMITS.SYMBOL}
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
            value: CURRENCY_FIELD_LIMITS.DESCRIPTION,
            message: `Max ${CURRENCY_FIELD_LIMITS.DESCRIPTION} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Description"
            placeholder="Optional"
            multiline
            maxLength={CURRENCY_FIELD_LIMITS.DESCRIPTION}
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

const styles = {
  container: {
    gap: spacing[4],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  actions: {
    flexDirection: "row" as const,
    gap: spacing[4],
    marginTop: spacing[4],
  },
}
