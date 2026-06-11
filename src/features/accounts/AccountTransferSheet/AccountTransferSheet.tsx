import { useEffect, useMemo, type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import DateTimeField from "#design/elements/DateTimeField"
import TextField from "#design/elements/TextField"
import Typography, {
  TYPOGRAPHY_TONE,
  TYPOGRAPHY_VARIANT,
} from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Autocomplete from "#design/patterns/Autocomplete"
import BottomSheet from "#design/patterns/BottomSheet"
import Form from "#design/patterns/Form"
import { formatStamp, parseStamp, todayStamp } from "#shared/data/time"
import { useI18n } from "#shared/i18n"

import { useAccounts } from "../useAccounts"

import { TRANSFER_DESCRIPTION_LIMIT } from "./constants"
import {
  type AccountTransferSheetProps,
  type TransferFormValues,
} from "./types"

export default function AccountTransferSheet({
  account,
  open,
  onClose,
  onSubmit,
}: AccountTransferSheetProps): ReactElement {
  const { t } = useI18n()
  const { data: accounts } = useAccounts()
  const { control, handleSubmit, reset } = useForm<TransferFormValues>({
    defaultValues: {
      toAccountId: 0,
      amount: "",
      date: todayStamp(),
      description: "",
    },
  })

  const eligibleAccounts = useMemo(() => {
    if (account === null) {
      return []
    }

    return accounts?.filter(
      (candidate) =>
        candidate.id !== account.id &&
        candidate.currency.id === account.currency.id,
    ) ?? []
  }, [account, accounts])

  const accountOptions = useMemo(
    () =>
      eligibleAccounts.map((candidate) => ({
        id: candidate.id,
        label: candidate.name,
      })),
    [eligibleAccounts],
  )

  useEffect(() => {
    reset({
      toAccountId: eligibleAccounts[0]?.id ?? 0,
      amount: "",
      date: todayStamp(),
      description: "",
    })
  }, [eligibleAccounts, open, reset])

  const submit = (values: TransferFormValues): void => {
    const amount = Number(values.amount.trim())
    const description = values.description.trim()

    onSubmit(
      values.toAccountId,
      amount,
      values.date,
      description === "" ? undefined : description,
    )
    onClose()
  }

  return (
    <BottomSheet
      open={open}
      title={t("accounts.transfer.title")}
      onClose={onClose}
    >
      {account !== null && (
        <>
          <View style={styles.summary}>
            <Typography
              variant={TYPOGRAPHY_VARIANT.LABEL}
              tone={TYPOGRAPHY_TONE.MUTED}
            >
              {t("accounts.transfer.fromAccount")}
            </Typography>
            <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
              {account.name}
            </Typography>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              {account.balance.toFixed(2)} {account.currency.symbol}
            </Typography>
          </View>

          {eligibleAccounts.length === 0 ? (
            <View style={styles.empty}>
              <Typography tone={TYPOGRAPHY_TONE.MUTED}>
                {t("accounts.transfer.needCompatibleAccount")}
              </Typography>
            </View>
          ) : (
            <Form
              submitLabel={t("accounts.transfer.submit")}
              onSubmit={handleSubmit(submit)}
            >
              <Controller
                control={control}
                name="toAccountId"
                rules={{
                  required: t("form.validation.required.account"),
                  validate: (value) => {
                    if (value === 0) {
                      return t("form.validation.required.account")
                    }
                    if (value === account.id) {
                      return t("accounts.transfer.validation.differentAccount")
                    }
                    return true
                  },
                }}
                render={({ field: { onChange, value }, fieldState }) => (
                  <Autocomplete
                    label={t("accounts.transfer.toAccount")}
                    placeholder={t("accounts.transfer.toAccount.placeholder")}
                    options={accountOptions}
                    value={value}
                    onChange={onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="amount"
                rules={{
                  required: t("form.validation.required.amount"),
                  validate: (value) => {
                    const trimmed = value.trim()
                    if (trimmed === "" || !Number.isFinite(Number(trimmed))) {
                      return t("form.validation.invalidAmount")
                    }
                    if (Number(trimmed) <= 0) {
                      return t("form.validation.invalidPositiveAmount")
                    }
                    return true
                  },
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
                name="description"
                rules={{
                  maxLength: {
                    value: TRANSFER_DESCRIPTION_LIMIT,
                    message: t("form.validation.maxCharacters", {
                      max: TRANSFER_DESCRIPTION_LIMIT,
                    }),
                  },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                  <TextField
                    label={t("accounts.transfer.description")}
                    placeholder={t("accounts.transfer.description.placeholder")}
                    maxLength={TRANSFER_DESCRIPTION_LIMIT}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Form>
          )}
        </>
      )}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  summary: {
    gap: spacing(1),
    paddingTop: spacing(3),
  },
  empty: {
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
  },
})
