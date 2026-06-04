import { type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
import TextField from "#design/elements/TextField"
import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import DeleteButton from "#design/patterns/DeleteButton"
import Form from "#design/patterns/Form"

import { THEME_COLOR, useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

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
  const { t } = useI18n()
  const { control, handleSubmit } = useForm<AddCategoryDto>({
    defaultValues: defaultValues ?? EMPTY_CATEGORY,
  })

  const submit = (values: AddCategoryDto): void => {
    const { description: rawDescription, ...rest } = values
    const description = rawDescription?.trim()

    onSubmit({
      ...rest,
      ...(description ? { description } : {}),
      color: normalizeHexColor(values.color),
    })
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
            value: CATEGORY_FIELD_LIMITS.NAME,
            message: t("form.validation.maxCharacters", {
              max: CATEGORY_FIELD_LIMITS.NAME,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.category.name")}
            placeholder={t("form.category.name.placeholder")}
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
            <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
              {t("form.category.type")}
            </Typography>
            <View style={styles.options}>
              <Chip
                active={value === TRANSACTION_TYPE.EXPENSE}
                label={t("form.category.type.expense")}
                onPress={() => {
                  onChange(TRANSACTION_TYPE.EXPENSE)
                }}
              />
              <Chip
                active={value === TRANSACTION_TYPE.INCOME}
                label={t("form.category.type.income")}
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
        name="description"
        rules={{
          maxLength: {
            value: CATEGORY_FIELD_LIMITS.DESCRIPTION,
            message: t("form.validation.maxCharacters", {
              max: CATEGORY_FIELD_LIMITS.DESCRIPTION,
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <TextField
            label={t("form.category.description")}
            placeholder={t("form.category.description.placeholder")}
            multiline
            maxLength={CATEGORY_FIELD_LIMITS.DESCRIPTION}
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="color"
        rules={{
          required: t("form.validation.required.color"),
          validate: (value) =>
            isValidHexColor(value) || t("form.validation.invalidHex"),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          const normalized = normalizeHexColor(value).toLowerCase()

          return (
            <View style={styles.field}>
              <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
                {t("form.category.color")}
              </Typography>
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
  swatch: {
    borderRadius: radius.full,
    borderWidth: 3,
    height: spacing(8),
    width: spacing(8),
  },
})
