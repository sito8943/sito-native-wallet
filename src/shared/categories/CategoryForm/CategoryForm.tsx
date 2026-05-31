import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Chip from "#design/elements/Chip"
import TextField from "#design/elements/TextField"
import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { THEME_COLOR, useThemeColors } from "#shared/theme"

import { type AddCategoryDto } from "../dtos"
import { TRANSACTION_TYPE } from "../TransactionCategory"

import {
  CATEGORY_FIELD_LIMITS,
  CATEGORY_PALETTE,
  EMPTY_CATEGORY,
} from "./constants"
import { type CategoryFormProps } from "./types"
import { isValidHexColor, normalizeHexColor } from "./utils"

export default function CategoryForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: CategoryFormProps): ReactElement {
  const colors = useThemeColors()
  const { control, handleSubmit } = useForm<AddCategoryDto>({
    defaultValues: defaultValues ?? EMPTY_CATEGORY,
  })

  const submit = (values: AddCategoryDto): void => {
    onSubmit({ ...values, color: normalizeHexColor(values.color) })
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name is required",
          maxLength: {
            value: CATEGORY_FIELD_LIMITS.NAME,
            message: `Max ${CATEGORY_FIELD_LIMITS.NAME} characters`,
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label="Name"
            placeholder="Groceries"
            autoCapitalize="words"
            maxLength={CATEGORY_FIELD_LIMITS.NAME}
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
                active={value === TRANSACTION_TYPE.EXPENSE}
                label="Expense"
                onPress={() => {
                  onChange(TRANSACTION_TYPE.EXPENSE)
                }}
              />
              <Chip
                active={value === TRANSACTION_TYPE.INCOME}
                label="Income"
                onPress={() => {
                  onChange(TRANSACTION_TYPE.INCOME)
                }}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="color"
        rules={{
          required: "Color is required",
          validate: (value) =>
            isValidHexColor(value) || "Enter a valid hex color (e.g. #2e7d32)",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          const normalized = normalizeHexColor(value).toLowerCase()

          return (
            <View style={styles.field}>
              <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>Color</Typography>
              <View style={styles.options}>
                {CATEGORY_PALETTE.map((color) => (
                  <Pressable
                    key={color}
                    accessibilityLabel={color}
                    accessibilityRole="button"
                    style={[
                      styles.swatch,
                      {
                        backgroundColor: color,
                        borderColor:
                          color.toLowerCase() === normalized
                            ? colors[THEME_COLOR.TEXT_STRONG]
                            : color,
                      },
                    ]}
                    onPress={() => {
                      onChange(color)
                    }}
                  />
                ))}
              </View>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="#2e7d32"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
              />
            </View>
          )
        }}
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
  swatch: {
    borderRadius: radius.full,
    borderWidth: 3,
    height: spacing[8],
    width: spacing[8],
  },
  actions: {
    flexDirection: "row",
    gap: spacing[4],
    marginTop: spacing[4],
  },
})
