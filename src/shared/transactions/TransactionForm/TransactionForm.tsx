import { useMemo, type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"

import TextField from "#design/elements/TextField"
import Autocomplete from "#design/patterns/Autocomplete"
import DeleteButton from "#design/patterns/DeleteButton"
import Form from "#design/patterns/Form"
import { useAccounts } from "#shared/accounts"
import { useCategories } from "#shared/categories"

import { type AddTransactionDto } from "../dtos"

import { DATE_PATTERN, TRANSACTION_FIELD_LIMITS } from "./constants"
import { type TransactionFormProps, type TransactionFormValues } from "./types"
import { isValidAmount, parseAmount, toFormValues } from "./utils"

export default function TransactionForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: TransactionFormProps): ReactElement {
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()
  const { control, handleSubmit } = useForm<TransactionFormValues>({
    defaultValues: toFormValues(defaultValues),
  })

  const accountOptions = useMemo(
    () =>
      (accounts ?? []).map((account) => ({
        id: account.id,
        label: account.name,
      })),
    [accounts],
  )

  const categoryOptions = useMemo(
    () =>
      categories
        .filter((category) => category.system !== true)
        .map((category) => ({
          id: category.id,
          label: category.name,
        })),
    [categories],
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
          required: "Description is required",
          maxLength: {
            value: TRANSACTION_FIELD_LIMITS.DESCRIPTION,
            message: `Max ${TRANSACTION_FIELD_LIMITS.DESCRIPTION} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Description"
            placeholder="Groceries"
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
          required: "Amount is required",
          validate: (value) =>
            isValidAmount(value) || "Enter an amount greater than 0",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Amount"
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
        rules={{
          required: "Date is required",
          pattern: {
            value: DATE_PATTERN,
            message: "Use the format YYYY/MM/DD",
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Date"
            placeholder="2026/05/24"
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="accountId"
        rules={{ required: "Account is required" }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            label="Account"
            placeholder="Search accounts"
            options={accountOptions}
            value={value === "" ? null : value}
            onChange={(next) => {
              onChange(next ?? "")
            }}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryIds"
        rules={{ validate: (value) => value.length > 0 || "Pick a category" }}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            multiple
            label="Categories"
            placeholder="Search categories"
            options={categoryOptions}
            value={value}
            onChange={onChange}
            error={fieldState.error?.message}
          />
        )}
      />

    </Form>
  )
}
