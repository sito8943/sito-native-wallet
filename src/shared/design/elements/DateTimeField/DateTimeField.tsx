import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker"
import { useState, type ReactElement } from "react"
import { Platform, Pressable, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  typography,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type DateTimeFieldProps } from "./types"
import { display } from "./utils"

// Native date + time picker styled like TextField. Android opens the platform
// dialogs (date then time) imperatively; iOS shows an inline spinner closed by
// a Done button. Works in Date space; callers map to/from their stored format.
export default function DateTimeField({
  label,
  value,
  onChange,
  error,
  placeholder,
  containerStyle,
}: DateTimeFieldProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { t } = useI18n()
  const [iosOpen, setIosOpen] = useState(false)

  const current = value ?? new Date()

  const openPicker = (): void => {
    if (Platform.OS !== "android") {
      setIosOpen(true)
      return
    }

    // onValueChange fires only on confirm (dismiss is a separate callback we
    // don't need), so a defined value is enough — no event.type check.
    DateTimePickerAndroid.open({
      value: current,
      mode: "date",
      is24Hour: true,
      onValueChange: (_dateEvent, picked) => {
        if (picked === undefined) {
          return
        }

        DateTimePickerAndroid.open({
          value: picked,
          mode: "time",
          is24Hour: true,
          onValueChange: (_timeEvent, time) => {
            if (time === undefined) {
              return
            }

            onChange(
              new Date(
                picked.getFullYear(),
                picked.getMonth(),
                picked.getDate(),
                time.getHours(),
                time.getMinutes(),
              ),
            )
          },
        })
      },
    })
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label !== undefined && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.LABEL}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {label}
        </Typography>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        onPress={openPicker}
        style={[styles.input, error !== undefined && styles.inputError]}
      >
        <Typography
          tone={
            value === null ? TYPOGRAPHY_TONE.MUTED : TYPOGRAPHY_TONE.DEFAULT
          }
        >
          {value === null ? (placeholder ?? "") : display(value)}
        </Typography>
      </Pressable>

      {Platform.OS === "ios" && iosOpen && (
        <View style={styles.iosPicker}>
          <DateTimePicker
            value={current}
            mode="datetime"
            display="spinner"
            onValueChange={(_event, picked) => {
              if (picked !== undefined) {
                onChange(picked)
              }
            }}
          />
          <Button
            accessibilityLabel={t("common.done")}
            variant={BUTTON_VARIANT.OUTLINED}
            onPress={() => {
              setIosOpen(false)
            }}
          >
            {t("common.done")}
          </Button>
        </View>
      )}

      {error !== undefined && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.CAPTION}
          style={styles.errorText}
        >
          {error}
        </Typography>
      )}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    gap: spacing(1),
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    justifyContent: "center" as const,
    minHeight:
      typography[TYPOGRAPHY_VARIANT.BODY].fontSize + spacing(4) + spacing(1),
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
  },
  inputError: {
    borderColor: colors.negative,
  },
  iosPicker: {
    gap: spacing(2),
  },
  errorText: {
    color: colors.negative,
  },
})
