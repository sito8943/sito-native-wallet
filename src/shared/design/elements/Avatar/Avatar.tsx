import { type ReactElement } from "react"
import { Image, StyleSheet, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { AVATAR_DIMENSIONS, AVATAR_SIZE } from "./constants"
import { type AvatarProps } from "./types"

// Circular identity badge: shows the photo when set, else the name initials, or
// a generic profile icon when there are none yet. Diameter and theme colour are
// runtime-dynamic.
export default function Avatar({
  initials,
  uri,
  size = AVATAR_SIZE.MD,
}: AvatarProps): ReactElement {
  const colors = useThemeColors()
  const { diameter, textVariant } = AVATAR_DIMENSIONS[size]
  const dimensions = { width: diameter, height: diameter }

  if (uri !== undefined && uri !== null && uri !== "") {
    return (
      <Image
        source={{ uri }}
        style={[styles.base, dimensions]}
        accessibilityIgnoresInvertColors
      />
    )
  }

  return (
    <View
      style={[styles.base, dimensions, { backgroundColor: colors.primary }]}
    >
      {initials ? (
        <Typography variant={textVariant} tone={TYPOGRAPHY_TONE.INVERTED}>
          {initials}
        </Typography>
      ) : (
        <Icon icon={APP_ICONS.profile} color={colors.textInverted} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
})
