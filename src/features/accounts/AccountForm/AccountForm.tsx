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
import { useCurrencies } from "#features/currencies"
import { useI18n } from "#shared/i18n"

import { ACCOUNT_BANK_OPTIONS, ACCOUNT_TYPE } from "../Account"
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
  const { t } = useI18n()
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
  const selectedBankOptionId = (bankName: string): number =>
    ACCOUNT_BANK_OPTIONS.find((option) => option.label === bankName)?.id ?? 0

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
          required: t("form.validation.required.name"),
          maxLength: {
            value: ACCOUNT_FIELD_LIMITS.NAME,
            message: t("form.validation.maxCharacters", {
              max: ACCOUNT_FIELD_LIMITS.NAME,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.account.name")}
            placeholder={t("form.account.name.placeholder")}
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
            message: t("form.validation.maxCharacters", {
              max: ACCOUNT_FIELD_LIMITS.DESCRIPTION,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.account.description")}
            placeholder={t("form.account.description.placeholder")}
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
          validate: (value) =>
            isValidBalance(value) || t("form.validation.invalidAmount"),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.account.balance")}
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
            <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
              {t("form.account.type")}
            </Typography>
            <View style={styles.options}>
              <Chip
                active={value === ACCOUNT_TYPE.CASH}
                label={t("form.account.type.cash")}
                onPress={() => {
                  onChange(ACCOUNT_TYPE.CASH)
                }}
              />
              <Chip
                active={value === ACCOUNT_TYPE.DIGITAL}
                label={t("form.account.type.digital")}
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
              label={t("form.account.bank")}
              placeholder={t("form.account.bank.placeholder")}
              options={ACCOUNT_BANK_OPTIONS}
              value={selectedBankOptionId(value)}
              onChange={(next) => {
                onChange(
                  ACCOUNT_BANK_OPTIONS.find((option) => option.id === next)
                    ?.label ?? "",
                )
              }}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="currencyId"
        rules={{ required: t("form.validation.required.currency") }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            label={t("form.account.currency")}
            placeholder={t("form.account.currency.placeholder")}
            options={currencyOptions}
            value={value}
            onChange={onChange}
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
