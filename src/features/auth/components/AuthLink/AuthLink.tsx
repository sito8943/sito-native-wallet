import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { type AuthLinkProps } from "./types"

// A muted "question + tappable action" row used under the auth forms (e.g.
// "No account? Create one"). The action reads as a link via the primary color.
export default function AuthLink({
  question,
  action,
  onPress,
}: AuthLinkProps): ReactElement {
  const colors = useThemeColors()

  return (
    <View style={styles.row}>
      {question !== undefined && (
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {question}
        </Typography>
      )}
      <Pressable accessibilityRole="button" onPress={onPress}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          style={{ color: colors.primary }}
        >
          {action}
        </Typography>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(1),
    justifyContent: "center",
  },
})
