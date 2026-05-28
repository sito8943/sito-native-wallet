import { FontAwesome } from "@expo/vector-icons"
import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { radius, spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { BUTTON_SIZES } from "./constants"
import { type IconButtonProps } from "./types"
import { getContainerStyle, getIconColor } from "./utils"

export default function IconButton({
  accessibilityLabel,
  disabled = false,
  hitSlop = spacing.xs,
  icon,
  iconStyle,
  size = "md",
  style,
  variant = "filled",
  children,
  ...props
}: IconButtonProps): ReactElement {
  const colors = useThemeColors()
  const resolvedSize = BUTTON_SIZES[size]
  const containerStyle = getContainerStyle({ colors, disabled, variant })
  const iconColor = getIconColor({ colors, disabled, variant })

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
        <FontAwesome
          color={iconColor}
          name={icon}
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
    gap: spacing.xs,
    justifyContent: "center",
  },
})
