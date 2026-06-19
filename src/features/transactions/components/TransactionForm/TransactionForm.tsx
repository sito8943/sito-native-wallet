import { useMemo, type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"

import DateTimeField from "#design/elements/DateTimeField"
import TextField from "#design/elements/TextField"
import Autocomplete from "#design/patterns/Autocomplete"
import DeleteButton from "#design/patterns/DeleteButton"
import Form from "#design/patterns/Form"
import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { formatStamp, parseStamp } from "#shared/data"
import { useI18n } from "#shared/i18n"

import { type AddTransactionDto } from "../dtos"

import { TRANSACTION_FIELD_LIMITS } from "./constants"
import { type TransactionFormProps, type TransactionFormValues } from "./types"
import { isValidAmount, parseAmount, toFormValues } from "./utils"

export default function TransactionForm({
  defaultValues,
  defaultAccountId,
  submitLabel,
  onSubmit,
  onDelete,
  auto = false,
}: TransactionFormProps): ReactElement {
  const { t } = useI18n()
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()
  const { control, handleSubmit } = useForm<TransactionFormValues>({
    defaultValues: toFormValues(defaultValues, defaultAccountId),
  })

  const accountOptions = useMemo(
    () =>
      (accounts ?? []).map((account) => ({
        id: account.id,
        label: account.name,
      })),
    [accounts],
  )

  // System categories (e.g. balance adjustment) aren't pickable for manual
  // transactions, but an auto transaction owns one — keep it in the options so
  // its locked value resolves to a label instead of an empty chip.
  const categoryOptions = useMemo(
    () =>
      categories
        .filter((category) => auto || category.system !== true)
        .map((category) => ({
          id: category.id,
          label: category.name,
        })),
    [categories, auto],
  )

  const submit = (values: TransactionFormValues): void => {
    onSubmit({
      description: values.description,
      amount: parseAmount(values.amount),
      date: values.date,
      accountId: values.accountId,
      categoryIds: values.categoryIds,
    } satisfies AddTransactionDto)
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
        name="description"
        rules={{
          required: t("form.validation.required.description"),
          maxLength: {
            value: TRANSACTION_FIELD_LIMITS.DESCRIPTION,
            message: t("form.validation.maxCharacters", {
              max: TRANSACTION_FIELD_LIMITS.DESCRIPTION,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.transaction.description")}
            placeholder={t("form.transaction.description.placeholder")}
            maxLength={TRANSACTION_FIELD_LIMITS.DESCRIPTION}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        rules={{
          required: t("form.validation.required.amount"),
          validate: (value) =>
            isValidAmount(value) || t("form.validation.invalidPositiveAmount"),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.transaction.amount")}
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
        name="date"
        rules={{ required: t("form.validation.required.date") }}
        render={({ field: { onChange, value }, fieldState }) => (
          <DateTimeField
            label={t("form.transaction.date")}
            placeholder="2026/05/24 13:45"
            value={value ? parseStamp(value) : null}
            onChange={(date) => onChange(formatStamp(date))}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="accountId"
        // `required` won't catch the "none" sentinel (0 is a present value to
        // RHF), so validate that a real account (id > 0) was picked.
        rules={{
          validate: (value) =>
            value > 0 || t("form.validation.required.account"),
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            label={t("form.transaction.account")}
            placeholder={t("form.transaction.account.placeholder")}
            options={accountOptions}
            value={value}
            onChange={onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryIds"
        rules={{
          validate: (value) =>
            value.length > 0 || t("form.validation.pickCategory"),
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            multiple
            label={t("form.transaction.categories")}
            placeholder={t("form.transaction.categories.placeholder")}
            options={categoryOptions}
            value={value}
            onChange={onChange}
            disabled={auto}
            error={fieldState.error?.message}
          />
        )}
      />
    </Form>
  )
}
