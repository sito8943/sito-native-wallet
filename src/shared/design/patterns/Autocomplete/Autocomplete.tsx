import { useEffect, useMemo, useState, type ReactElement } from "react"
import { FlatList, Pressable, TextInput, View } from "react-native"

import Button from "#design/elements/Button"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  typography,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#shared/theme"

import { DEFAULT_DEBOUNCE_MS, ICON_SIZE, LIST_MAX_HEIGHT } from "./constants"
import { type AutocompleteOption, type AutocompleteProps } from "./types"

export default function Autocomplete(props: AutocompleteProps): ReactElement {
  const {
    label,
    placeholder = "Select",
    options,
    error,
    containerStyle,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    onSearch,
  } = props
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const optionLabel = (id: string): string =>
    options.find((option) => option.id === id)?.label ?? ""

  const selectedIds = useMemo(
    () =>
      props.multiple ? props.value : props.value === null ? [] : [props.value],
    [props.multiple, props.value],
  )

  // Debounce the query before it drives filtering and any async search.
  useEffect(() => {
    const normalized = query.trim().toLowerCase()

    const commit = (): void => {
      setDebouncedQuery(normalized)
      onSearch?.(normalized)
    }

    if (debounceMs <= 0) {
      commit()
      return
    }

    const timer = setTimeout(commit, debounceMs)

    return () => {
      clearTimeout(timer)
    }
  }, [query, debounceMs, onSearch])

  const suggestions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(debouncedQuery),
      ),
    [options, debouncedQuery],
  )

  const isSelected = (id: string): boolean => selectedIds.includes(id)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
    setQuery("")
  }

  const handleSelect = (id: string): void => {
    if (props.multiple) {
      props.onChange(
        isSelected(id)
          ? props.value.filter((selected) => selected !== id)
          : [...props.value, id],
      )
      return
    }

    props.onChange(id)
    handleClose()
  }

  const handleClear = (): void => {
    if (props.multiple) {
      return
    }

    props.onChange(null)
  }

  const showClear = !props.multiple && props.value !== null
  const singleLabel =
    !props.multiple && props.value !== null ? optionLabel(props.value) : ""
  const hasValue = selectedIds.length > 0

  const renderOption = ({
    item,
  }: {
    item: AutocompleteOption
  }): ReactElement => {
    const selected = isSelected(item.id)

    return (
      <Pressable
        accessibilityRole="button"
        style={styles.option}
        onPress={() => {
          handleSelect(item.id)
        }}
      >
        <Typography tone={selected ? TYPOGRAPHY_TONE.DEFAULT : undefined}>
          {item.label}
        </Typography>
        {selected && (
          <Icon
            color={colors.primary}
            icon={APP_ICONS.check}
            size={ICON_SIZE}
          />
        )}
      </Pressable>
    )
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
        style={[styles.trigger, error !== undefined && styles.triggerError]}
        onPress={handleOpen}
      >
        <View style={styles.triggerContent}>
          {props.multiple && hasValue ? (
            <View style={styles.chips}>
              {selectedIds.map((id) => (
                <View key={id} style={styles.chip}>
                  <Typography
                    variant={TYPOGRAPHY_VARIANT.SUBTLE}
                    tone={TYPOGRAPHY_TONE.INVERTED}
                  >
                    {optionLabel(id)}
                  </Typography>
                </View>
              ))}
            </View>
          ) : (
            <Typography
              numberOfLines={1}
              style={hasValue ? undefined : styles.placeholder}
            >
              {props.multiple || !hasValue ? placeholder : singleLabel}
            </Typography>
          )}
        </View>

        {showClear ? (
          <Pressable
            accessibilityLabel="Clear selection"
            accessibilityRole="button"
            hitSlop={spacing[2]}
            onPress={handleClear}
          >
            <Icon
              color={colors.textMuted}
              icon={APP_ICONS.close}
              size={ICON_SIZE}
            />
          </Pressable>
        ) : (
          <Icon
            color={colors.textMuted}
            icon={APP_ICONS.chevronDown}
            size={ICON_SIZE}
          />
        )}
      </Pressable>

      {error !== undefined && (
        <Typography variant={TYPOGRAPHY_VARIANT.CAPTION} style={styles.error}>
          {error}
        </Typography>
      )}

      <BottomSheet open={open} title={label} onClose={handleClose}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          placeholder="Search"
          placeholderTextColor={colors.textSubtle}
          returnKeyType="search"
          style={styles.search}
          value={query}
          onChangeText={setQuery}
        />

        <FlatList
          data={suggestions}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id}
          renderItem={renderOption}
          style={styles.list}
          ListEmptyComponent={
            <Typography style={styles.empty} tone={TYPOGRAPHY_TONE.MUTED}>
              No results
            </Typography>
          }
        />

        {props.multiple && <Button label="Done" onPress={handleClose} />}
      </BottomSheet>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    gap: spacing[1],
  },
  trigger: {
    alignItems: "center" as const,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    flexDirection: "row" as const,
    gap: spacing[2],
    justifyContent: "space-between" as const,
    minHeight: spacing[12],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  triggerError: {
    borderColor: colors.negative,
  },
  triggerContent: {
    flex: 1,
  },
  placeholder: {
    color: colors.textSubtle,
  },
  chips: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing[2],
  },
  chip: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  search: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    color: colors.textStrong,
    fontSize: typography[TYPOGRAPHY_VARIANT.BODY].fontSize,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
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
    paddingHorizontal: spacing[1],
    paddingVertical: spacing[3],
  },
  empty: {
    paddingVertical: spacing[4],
    textAlign: "center" as const,
  },
  error: {
    color: colors.negative,
  },
})
