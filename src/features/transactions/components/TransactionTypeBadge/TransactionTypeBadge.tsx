import { type ReactElement } from "react"

import { View, StyleSheet } from "react-native"

import Icon, { APP_ICONS, type IconProps } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"
// Deep path on purpose: the #features/categories barrel pulls in CategoryCard,
// which imports this badge — an eval-time cycle. TransactionCategory has none.
import { TRANSACTION_TYPE } from "#features/categories/TransactionCategory"

import { type TransactionTypeBadgeProps } from "./types"

export default function TransactionTypeBadge({
  type,
  filled = true,
  showIcon = true,
  showText = true,
  style,
  iconStyle,
}: TransactionTypeBadgeProps): ReactElement {
  const colors = useThemeColors()

  const tone =
    type === TRANSACTION_TYPE.INCOME ? colors.positive : colors.negative

  // FontAwesome sizes from the `size` prop, not style.fontSize — pull it out of
  // iconStyle so callers can size the icon via a single style prop.
  const flatIconStyle = StyleSheet.flatten(iconStyle)
  const iconSize =
    typeof flatIconStyle?.fontSize === "number"
      ? flatIconStyle.fontSize
      : undefined

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: filled ? tone : colors.background,
        },
        style,
      ]}
    >
      {showIcon && (
        <Icon
          size={iconSize}
          color={filled ? colors.textInverted : tone}
          // Pass the flattened iconStyle (fontSize is already lifted into `size`
          // above); cast since FontAwesome types its style narrowly.
          style={flatIconStyle as IconProps["style"]}
          icon={type === TRANSACTION_TYPE.INCOME ? APP_ICONS.in : APP_ICONS.out}
        />
      )}
      {showText && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.CAPTION}
          tone={TYPOGRAPHY_TONE.INVERTED}
        >
          {type}
        </Typography>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,

    paddingHorizontal: 1,
    paddingVertical: 1,

    height: spacing(8),
    width: spacing(8),

    borderRadius: 999,
  },
})
