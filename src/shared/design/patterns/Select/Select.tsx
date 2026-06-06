import { useState, type ReactElement } from "react"
import { FlatList, Pressable, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"
import { useI18n } from "#shared/i18n"

import { ICON_SIZE, LIST_MAX_HEIGHT } from "./constants"
import { type SelectOption, type SelectProps } from "./types"

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  error,
  containerStyle,
}: SelectProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)
  const [open, setOpen] = useState(false)

  const selected = options.find((option) => option.id === value)

  const handleSelect = (id: number): void => {
    onChange(id)
    setOpen(false)
  }

  const renderOption = ({ item }: { item: SelectOption }): ReactElement => (
    <Pressable
      accessibilityRole="button"
      style={styles.option}
      onPress={() => {
        handleSelect(item.id)
      }}
    >
      <Typography>{item.label}</Typography>
      {item.id === value && (
        <Icon color={colors.primary} icon={APP_ICONS.check} size={ICON_SIZE} />
      )}
    </Pressable>
  )

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
        accessibilityState={{ disabled }}
        disabled={disabled}
        style={[
          styles.trigger,
          error !== undefined && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
        onPress={() => {
          setOpen(true)
        }}
      >
        <Typography
          numberOfLines={1}
          style={selected ? undefined : styles.placeholder}
        >
          {selected
            ? selected.label
            : (placeholder ?? t("autocomplete.select"))}
        </Typography>
        <Icon
          color={colors.textMuted}
          icon={APP_ICONS.chevronDown}
          size={ICON_SIZE}
        />
      </Pressable>

      {error !== undefined && (
        <Typography variant={TYPOGRAPHY_VARIANT.CAPTION} style={styles.error}>
          {error}
        </Typography>
      )}

      <BottomSheet
        open={open}
        title={label}
        onClose={() => {
          setOpen(false)
        }}
      >
        <FlatList
          data={options}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOption}
          style={styles.list}
        />
      </BottomSheet>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    gap: spacing(1),
  },
  trigger: {
    alignItems: "center" as const,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    flexDirection: "row" as const,
    gap: spacing(2),
    justifyContent: "space-between" as const,
    minHeight: spacing(12),
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
  },
  triggerError: {
    borderColor: colors.negative,
  },
  triggerDisabled: {
    backgroundColor: colors.background,
    opacity: 0.6,
  },
  placeholder: {
    color: colors.textSubtle,
  },
  list: {
    maxHeight: LIST_MAX_HEIGHT,
  },
  option: {
    alignItems: "center" as const,
    borderBottomColor: colors.border,
    borderBottomWidth: borderWidth.thin,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(3),
  },
  error: {
    color: colors.negative,
  },
})
