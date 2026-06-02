import { forwardRef } from "react"
import { TextInput, View } from "react-native"

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

import { type TextFieldProps } from "./types"

const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, containerStyle, multiline, ...props },
  ref,
) {
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)

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

      <TextInput
        ref={ref}
        multiline={multiline}
        placeholderTextColor={colors.textSubtle}
        style={[
          styles.input,
          multiline === true && styles.multiline,
          error !== undefined && styles.inputError,
        ]}
        {...props}
      />

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
})

export default TextField

const createStyles = (colors: ThemeColors) => ({
  container: {
    gap: spacing(1),
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    color: colors.textStrong,
    fontSize: typography[TYPOGRAPHY_VARIANT.BODY].fontSize,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
  },
  multiline: {
    minHeight: spacing(24),
    paddingTop: spacing(2),
    textAlignVertical: "top" as const,
  },
  inputError: {
    borderColor: colors.negative,
  },
  errorText: {
    color: colors.negative,
  },
})
