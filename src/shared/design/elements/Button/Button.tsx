import { type ReactElement, type ReactNode } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"

import { BUTTON_VARIANT } from "./constants"
import { type ButtonProps } from "./types"
import { getButtonColors } from "./utils"

export default function Button({
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  loading = false,
  disabled = false,
  style,
  ...props
}: ButtonProps): ReactElement {
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)
  const { backgroundColor, borderColor, borderWidth, tone } = getButtonColors(
    colors,
    variant,
  )
  const isDisabled = disabled || loading
  const renderContent = (content: ReactNode): ReactElement | ReactNode =>
    typeof content === "string" || typeof content === "number" ? (
      <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG} tone={tone}>
        {content}
      </Typography>
    ) : (
      content
    )

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator color={colors.textInverted} size="small" />
        )}
        {renderContent(children)}
      </View>
    </Pressable>
  )
}

const createStyles = (_colors: ThemeColors) => ({
  base: {
    alignItems: "center" as const,
    borderRadius: radius.full,
    justifyContent: "center" as const,
    minHeight: spacing(12),
    paddingHorizontal: spacing(5),
    paddingVertical: spacing(1),
  },
  content: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(2),
    justifyContent: "center" as const,
  },
})
