import { useEffect, useRef, useState, type ReactElement } from "react"
import { Pressable, ScrollView, TextInput, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  typography,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#shared/theme"

import { ICON_SIZE } from "./constants"
import { type AutocompleteProps } from "./types"

export default function Autocomplete(props: AutocompleteProps): ReactElement {
  const { label, placeholder, options, error, containerStyle } = props
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const optionLabel = (id: string): string =>
    options.find((option) => option.id === id)?.label ?? ""

  const selectedIds = props.multiple
    ? props.value
    : props.value === null
      ? []
      : [props.value]

  const singleLabel =
    !props.multiple && props.value !== null ? optionLabel(props.value) : ""

  // Single mode mirrors the selected label in the field while it is not being
  // edited.
  useEffect(() => {
    if (props.multiple) {
      return
    }

    if (!open) {
      setQuery(singleLabel)
    }
  }, [props.multiple, singleLabel, open])

  const normalizedQuery = query.trim().toLowerCase()
  const suggestions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(normalizedQuery) &&
      !selectedIds.includes(option.id),
  )

  const handleFocus = (): void => {
    if (blurTimeout.current !== null) {
      clearTimeout(blurTimeout.current)
    }

    setOpen(true)
  }

  // Delay closing so a tap on a suggestion registers before blur unmounts it.
  const handleBlur = (): void => {
    blurTimeout.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  const handleSelect = (id: string): void => {
    if (props.multiple) {
      props.onChange([...props.value, id])
      setQuery("")
      return
    }

    props.onChange(id)
    setQuery(optionLabel(id))
    setOpen(false)
  }

  const handleClearSingle = (): void => {
    if (props.multiple) {
      return
    }

    props.onChange(null)
    setQuery("")
  }

  const handleRemove = (id: string): void => {
    if (!props.multiple) {
      return
    }

    props.onChange(props.value.filter((selected) => selected !== id))
  }

  const showClear = !props.multiple && props.value !== null

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

      <View style={styles.inputRow}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtle}
          style={[styles.input, error !== undefined && styles.inputError]}
          value={query}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setQuery(text)
            setOpen(true)
          }}
          onFocus={handleFocus}
        />

        {showClear && (
          <Pressable
            accessibilityLabel="Clear selection"
            accessibilityRole="button"
            hitSlop={spacing[2]}
            style={styles.clear}
            onPress={handleClearSingle}
          >
            <Icon
              color={colors.textMuted}
              icon={APP_ICONS.close}
              size={ICON_SIZE}
            />
          </Pressable>
        )}
      </View>

      {props.multiple && selectedIds.length > 0 && (
        <View style={styles.chips}>
          {selectedIds.map((id) => (
            <Pressable
              key={id}
              accessibilityLabel={`Remove ${optionLabel(id)}`}
              accessibilityRole="button"
              style={styles.chip}
              onPress={() => {
                handleRemove(id)
              }}
            >
              <Typography
                variant={TYPOGRAPHY_VARIANT.SUBTLE}
                tone={TYPOGRAPHY_TONE.INVERTED}
              >
                {optionLabel(id)}
              </Typography>
              <Icon
                color={colors.textInverted}
                icon={APP_ICONS.close}
                size={spacing[3]}
              />
            </Pressable>
          ))}
        </View>
      )}

      {open && suggestions.length > 0 && (
        <View style={styles.suggestions}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {suggestions.map((option) => (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                style={styles.suggestion}
                onPress={() => {
                  handleSelect(option.id)
                }}
              >
                <Typography>{option.label}</Typography>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {error !== undefined && (
        <Typography variant={TYPOGRAPHY_VARIANT.CAPTION} style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    gap: spacing[1],
  },
  chips: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing[2],
    marginTop: spacing[1],
  },
  chip: {
    alignItems: "center" as const,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    flexDirection: "row" as const,
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  inputRow: {
    justifyContent: "center" as const,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    color: colors.textStrong,
    fontSize: typography[TYPOGRAPHY_VARIANT.BODY].fontSize,
    paddingHorizontal: spacing[3],
    paddingRight: spacing[10],
    paddingVertical: spacing[2],
  },
  inputError: {
    borderColor: colors.negative,
  },
  clear: {
    position: "absolute" as const,
    right: spacing[3],
  },
  suggestions: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    marginTop: spacing[1],
    maxHeight: spacing[24] * 2,
    overflow: "hidden" as const,
  },
  suggestion: {
    borderBottomColor: colors.border,
    borderBottomWidth: borderWidth.thin,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  error: {
    color: colors.negative,
  },
})
