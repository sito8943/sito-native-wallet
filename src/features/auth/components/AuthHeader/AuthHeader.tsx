import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Logo from "#design/elements/Logo"
import Typography from "#design/elements/Typography"
import { FONT_FAMILY, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"

// Brand mark shown above the auth forms: the primary-colored glyph over the
// "Sito Wallet" wordmark (mirrors the wallet web TextLogo).
export default function AuthHeader(): ReactElement {
  const colors = useThemeColors()

  return (
    <View style={styles.container}>
      <Logo width={spacing(28)} />
      <Typography
        variant={TYPOGRAPHY_VARIANT.DISPLAY}
        style={{ color: colors.primary, fontFamily: FONT_FAMILY.POPPINS_BOLD }}
      >
        Sito Wallet
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing(2),
    marginTop: spacing(8),
    marginBottom: spacing(4),
  },
})
