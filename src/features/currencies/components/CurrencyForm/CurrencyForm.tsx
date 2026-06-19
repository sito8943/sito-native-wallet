import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"

import TextField from "#design/elements/TextField"
import DeleteButton from "#design/patterns/DeleteButton"
import Form from "#design/patterns/Form"
import { useI18n } from "#shared/i18n"

import { type AddCurrencyDto } from "../../dtos"

import { CURRENCY_FIELD_LIMITS, EMPTY_CURRENCY } from "./constants"
import { type CurrencyFormProps } from "./types"

export default function CurrencyForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: CurrencyFormProps): ReactElement {
  const { t } = useI18n()
  const { control, handleSubmit } = useForm<AddCurrencyDto>({
    defaultValues: defaultValues ?? EMPTY_CURRENCY,
  })

  return (
    <Form
      submitLabel={submitLabel}
      onSubmit={handleSubmit(onSubmit)}
      extraActions={
        onDelete !== undefined ? <DeleteButton onPress={onDelete} /> : undefined
      }
    >
      <Controller
        control={control}
        name="name"
        rules={{
          required: t("form.validation.required.name"),
          maxLength: {
            value: CURRENCY_FIELD_LIMITS.NAME,
            message: t("form.validation.maxCharacters", {
              max: CURRENCY_FIELD_LIMITS.NAME,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.currency.name")}
            placeholder={t("form.currency.name.placeholder")}
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
          required: t("form.validation.required.symbol"),
          maxLength: {
            value: CURRENCY_FIELD_LIMITS.SYMBOL,
            message: t("form.validation.maxCharacters", {
              max: CURRENCY_FIELD_LIMITS.SYMBOL,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.currency.symbol")}
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
            message: t("form.validation.maxCharacters", {
              max: CURRENCY_FIELD_LIMITS.DESCRIPTION,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.currency.description")}
            placeholder={t("form.currency.description.placeholder")}
            multiline
            maxLength={CURRENCY_FIELD_LIMITS.DESCRIPTION}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
    </Form>
  )
}
