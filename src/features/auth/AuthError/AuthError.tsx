import { type ReactElement } from "react"
import { StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { type AuthErrorProps } from "./types"

// Submit-level error message shown under the auth form fields.
export default function AuthError({ message }: AuthErrorProps): ReactElement {
  const colors = useThemeColors()

  return (
    <Typography
      variant={TYPOGRAPHY_VARIANT.BODY}
      style={[styles.text, { color: colors.negative }]}
    >
      {message}
    </Typography>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
})
