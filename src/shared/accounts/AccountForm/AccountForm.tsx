import { useMemo, type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Chip from "#design/elements/Chip"
import TextField from "#design/elements/TextField"
import Typography, { TYPOGRAPHY_VARIANT } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Autocomplete from "#design/patterns/Autocomplete"
import { useCurrencies } from "#shared/currencies"

import { ACCOUNT_TYPE, ACCOUNT_TYPE_LABEL } from "../Account"
import { type AddAccountDto } from "../dtos"

import { ACCOUNT_FIELD_LIMITS } from "./constants"
import { type AccountFormProps, type AccountFormValues } from "./types"
import { isValidBalance, parseBalance, toFormValues } from "./utils"

export default function AccountForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: AccountFormProps): ReactElement {
  const { data: currencies } = useCurrencies()
  const { control, handleSubmit } = useForm<AccountFormValues>({
    defaultValues: toFormValues(defaultValues),
  })

  const currencyOptions = useMemo(
    () =>
      currencies.map((currency) => ({
        id: currency.id,
        label: `${currency.name} · ${currency.symbol}`,
      })),
    [currencies],
  )

  const submit = (values: AccountFormValues): void => {
    const currency = currencies.find((item) => item.id === values.currencyId)

    if (currency === undefined) {
      return
    }

    onSubmit({
      name: values.name,
      balance: parseBalance(values.balance),
      type: values.type,
      currency,
    } satisfies AddAccountDto)
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name is required",
          maxLength: {
            value: ACCOUNT_FIELD_LIMITS.NAME,
            message: `Max ${ACCOUNT_FIELD_LIMITS.NAME} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Name"
            placeholder="Main account"
            autoCapitalize="words"
            maxLength={ACCOUNT_FIELD_LIMITS.NAME}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="balance"
        rules={{
          required: "Balance is required",
          validate: (value) => isValidBalance(value) || "Enter a valid amount",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Balance"
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>Type</Typography>
            <View style={styles.options}>
              <Chip
                active={value === ACCOUNT_TYPE.CASH}
                label={ACCOUNT_TYPE_LABEL[ACCOUNT_TYPE.CASH]}
                onPress={() => {
                  onChange(ACCOUNT_TYPE.CASH)
                }}
              />
              <Chip
                active={value === ACCOUNT_TYPE.DIGITAL}
                label={ACCOUNT_TYPE_LABEL[ACCOUNT_TYPE.DIGITAL]}
                onPress={() => {
                  onChange(ACCOUNT_TYPE.DIGITAL)
                }}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="currencyId"
        rules={{ required: "Currency is required" }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            label="Currency"
            placeholder="Search currencies"
            options={currencyOptions}
            value={value === "" ? null : value}
            onChange={(next) => {
              onChange(next ?? "")
            }}
            error={fieldState.error?.message}
          />
        )}
      />

      <View style={styles.actions}>
        <Button label={submitLabel} onPress={handleSubmit(submit)} />

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
    gap: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  field: {
    gap: spacing[2],
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  actions: {
    flexDirection: "row",
    gap: spacing[4],
    marginTop: spacing[4],
  },
})
