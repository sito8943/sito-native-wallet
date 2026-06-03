import { type ReactElement, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import TextField from "#design/elements/TextField"
import Typography, {
  TYPOGRAPHY_TONE,
  TYPOGRAPHY_VARIANT,
} from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"

import { ADJUST_DESCRIPTION_LIMIT } from "./constants"
import {
  type AccountAdjustBalanceSheetProps,
  type AdjustFormValues,
  type AdjustPending,
} from "./types"

export default function AccountAdjustBalanceSheet({
  account,
  open,
  onClose,
  onSubmit,
}: AccountAdjustBalanceSheetProps): ReactElement {
  const { control, handleSubmit, reset } = useForm<AdjustFormValues>({
    defaultValues: { newBalance: "", description: "" },
  })
  // Holds the reviewed values: when set, the sheet shows the confirm step
  // instead of the form (no second modal stacked over the sheet).
  const [pending, setPending] = useState<AdjustPending | null>(null)

  // Reset form + step each time the sheet opens for an account.
  useEffect(() => {
    if (account !== null) {
      reset({ newBalance: String(account.balance), description: "" })
      setPending(null)
    }
  }, [account, open, reset])

  const review = (values: AdjustFormValues): void => {
    if (account === null) {
      return
    }

    const target = Number(values.newBalance.trim())
    if (target === account.balance) {
      return
    }

    const description = values.description.trim()
    setPending({
      target,
      description: description === "" ? undefined : description,
    })
  }

  const confirm = (): void => {
    if (pending === null) {
      return
    }

    onSubmit(pending.target, pending.description)
    onClose()
  }

  const renderForm = (): ReactElement | null => {
    if (account === null) {
      return null
    }

    return (
      <>
        <View style={styles.current}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.LABEL}
            tone={TYPOGRAPHY_TONE.MUTED}
          >
            Current balance
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {account.balance.toFixed(2)} {account.currency.symbol}
          </Typography>
        </View>

        <Controller
          control={control}
          name="newBalance"
          rules={{
            required: "New balance is required",
            validate: (value) => {
              const trimmed = value.trim()
              if (trimmed === "" || !Number.isFinite(Number(trimmed))) {
                return "Enter a valid amount"
              }
              if (Number(trimmed) === account.balance) {
                return "Enter a balance different from the current one"
              }
              return true
            },
          }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <TextField
              label="New balance"
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
          name="description"
          rules={{
            maxLength: {
              value: ADJUST_DESCRIPTION_LIMIT,
              message: `Max ${ADJUST_DESCRIPTION_LIMIT} characters`,
            },
          }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <TextField
              label="Description"
              placeholder="Reason for the adjustment"
              multiline
              maxLength={ADJUST_DESCRIPTION_LIMIT}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button label="Continue" onPress={handleSubmit(review)} />
      </>
    )
  }

  const renderConfirm = (): ReactElement | null => {
    if (account === null || pending === null) {
      return null
    }

    const delta = Math.round((pending.target - account.balance) * 100) / 100
    const sign = delta > 0 ? "+" : "−"
    const symbol = account.currency.symbol

    return (
      <>
        <View style={styles.current}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.LABEL}
            tone={TYPOGRAPHY_TONE.MUTED}
          >
            {account.balance.toFixed(2)} {symbol} → {pending.target.toFixed(2)}{" "}
            {symbol}
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {sign}
            {Math.abs(delta).toFixed(2)} {symbol}
          </Typography>
        </View>

        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          This records an adjustment transaction in this account&apos;s history
          and updates its balance. Apply it?
        </Typography>

        <Button label="Adjust balance" onPress={confirm} />
        <Button
          label="Back"
          variant={BUTTON_VARIANT.OUTLINED}
          onPress={() => setPending(null)}
        />
      </>
    )
  }

  return (
    <BottomSheet
      open={open}
      title={pending === null ? "Adjust balance" : "Confirm adjustment"}
      onClose={onClose}
    >
      {pending === null ? renderForm() : renderConfirm()}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  current: {
    gap: spacing(1),
  },
})
