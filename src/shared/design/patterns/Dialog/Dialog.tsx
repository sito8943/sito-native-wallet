import { type ReactElement } from "react"
import { Modal, Pressable } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

import { type DialogProps } from "./types"

// Modal surface with dimmed backdrop. Tapping the backdrop closes; tapping the
// card does not (inner Pressable swallows the press).
export default function Dialog({
  open,
  title,
  onClose,
  children,
}: DialogProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      // Android: draw under the system bars so the nav bar doesn't flash white.
      navigationBarTranslucent
      statusBarTranslucent
      visible={open}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card}>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>{title}</Typography>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const createStyles = (colors: ThemeColors) => ({
  backdrop: {
    alignItems: "center" as const,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center" as const,
    padding: spacing(6),
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing(4),
    padding: spacing(5),
    width: "100%" as const,
  },
})
