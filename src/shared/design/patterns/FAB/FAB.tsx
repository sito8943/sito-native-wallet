import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography, { TYPOGRAPHY_VARIANT } from "#design/elements/Typography"
import { shadows } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

import { FAB_POSITION } from "./constants"
import { type FABProps } from "./types"
import { getLabelColor, getPositionStyle } from "./utils"

export default function FAB({
  accessibilityLabel,
  icon,
  onPress,
  disabled = false,
  label,
  position = FAB_POSITION.BOTTOM_RIGHT,
  size = ICON_BUTTON_SIZE.LG,
  variant = ICON_BUTTON_VARIANT.FILLED,
  style,
}: FABProps): ReactElement {
  const colors = useThemeColors()
  const insets = useSafeAreaInsets()
  const positionStyle = getPositionStyle(position, insets)
  const labelColor = getLabelColor({ colors, disabled, variant })

  return (
    <View pointerEvents="box-none" style={[styles.layer, positionStyle, style]}>
      <IconButton
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        icon={icon}
        onPress={onPress}
        size={size}
        style={[styles.button, label != null && styles.extended]}
        variant={variant}
      >
        {label != null && (
          <Typography
            style={{ color: labelColor }}
            variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          >
            {label}
          </Typography>
        )}
      </IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
  },
  button: {
    ...shadows.card,
  },
  extended: {
    alignSelf: "flex-start",
  },
})
