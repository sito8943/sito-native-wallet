import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Icon from "#design/elements/Icon"
import { radius, spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import {
  BUTTON_SIZES,
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "./constants"
import { type IconButtonProps } from "./types"
import { getContainerStyle, getIconColor } from "./utils"

export default function IconButton({
  accessibilityLabel,
  disabled = false,
  hitSlop = spacing(2),
  icon,
  color,
  iconColor,
  iconStyle,
  size = ICON_BUTTON_SIZE.MD,
  style,
  variant = ICON_BUTTON_VARIANT.FILLED,
  children,
  ...props
}: IconButtonProps): ReactElement {
  const colors = useThemeColors()
  const resolvedSize = BUTTON_SIZES[size]
  const containerStyle = getContainerStyle({ colors, disabled, variant })
  const resolvedIconColor =
    iconColor ?? color ?? getIconColor({ colors, disabled, variant })

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: containerStyle.backgroundColor,
          borderColor: containerStyle.borderColor,
          borderWidth: containerStyle.borderWidth,
          minHeight: resolvedSize.minSize,
          minWidth: resolvedSize.minSize,
          opacity: pressed && !disabled ? 0.8 : 1,
          padding: resolvedSize.padding,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        <Icon
          color={resolvedIconColor}
          icon={icon}
          size={resolvedSize.iconSize}
          style={iconStyle}
        />
        {children}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: radius.full,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(2),
    justifyContent: "center",
  },
})
