import { useMemo, type ReactElement } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
import TextField from "#design/elements/TextField"
import Typography, { TYPOGRAPHY_VARIANT } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Autocomplete from "#design/patterns/Autocomplete"
import DeleteButton from "#design/patterns/DeleteButton"
import Form from "#design/patterns/Form"
import { useCurrencies } from "#shared/currencies"

import {
  ACCOUNT_BANK_OPTIONS,
  ACCOUNT_TYPE,
  ACCOUNT_TYPE_LABEL,
} from "../Account"
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

  const type = useWatch({ control, name: "type" })
  const showBankField = type === ACCOUNT_TYPE.DIGITAL

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
    const bankName = values.bankName.trim()
    const description = values.description.trim()

    if (currency === undefined) {
      return
    }

    onSubmit({
      name: values.name,
      ...(description !== "" ? { description } : {}),
      ...(bankName !== "" && values.type === ACCOUNT_TYPE.DIGITAL
        ? { bankName }
        : {}),
      balance: parseBalance(values.balance),
      type: values.type,
      currency,
    } satisfies AddAccountDto)
  }

  return (
    <Form
      submitLabel={submitLabel}
      onSubmit={handleSubmit(submit)}
      extraActions={
        onDelete !== undefined ? <DeleteButton onPress={onDelete} /> : undefined
      }
    >
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
        name="description"
        rules={{
          maxLength: {
            value: ACCOUNT_FIELD_LIMITS.DESCRIPTION,
            message: `Max ${ACCOUNT_FIELD_LIMITS.DESCRIPTION} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Description"
            placeholder="Optional note"
            multiline
            maxLength={ACCOUNT_FIELD_LIMITS.DESCRIPTION}
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
          validate: (value) => isValidBalance(value) || "Enter a valid amount",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Balance"
            placeholder="0.00"
            defaultValue="0"
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

      {showBankField && (
        <Controller
          control={control}
          name="bankName"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              label="Bank"
              placeholder="Select bank"
              options={ACCOUNT_BANK_OPTIONS}
              value={value === "" ? null : value}
              onChange={(next) => {
                onChange(next ?? "")
              }}
            />
          )}
        />
      )}

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

    </Form>
  )
}

const styles = StyleSheet.create({
  field: {
    gap: spacing(2),
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
})
