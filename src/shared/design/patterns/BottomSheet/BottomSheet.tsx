import { type ReactElement } from "react"
import { Modal, Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { SHEET_MAX_HEIGHT, SHEET_PADDING_BOTTOM } from "./constants"
import { type BottomSheetProps } from "./types"
import { useKeyboardHeight } from "./useKeyboardHeight"

// Bottom-anchored Modal surface. Lives in its own native hierarchy, so opening
// it never re-renders or steals focus from the screen behind it. Tapping the
// backdrop closes; tapping the sheet does not.
export default function BottomSheet({
  open,
  title,
  onClose,
  children,
}: BottomSheetProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const insets = useSafeAreaInsets()
  const keyboardHeight = useKeyboardHeight()

  // With the keyboard up it already covers the nav-bar inset, so drop the
  // extra bottom padding and lift the whole sheet by the keyboard height.
  const sheetStyle = {
    marginBottom: keyboardHeight,
    paddingBottom:
      keyboardHeight > 0
        ? SHEET_PADDING_BOTTOM
        : SHEET_PADDING_BOTTOM + insets.bottom,
  }

  return (
    <Modal
      animationType="slide"
      navigationBarTranslucent
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={open}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityLabel="Close"
          style={styles.backdrop}
          onPress={onClose}
        />
        <Pressable style={[styles.sheet, sheetStyle]}>
          <View style={styles.handle} />
          {title !== undefined && (
            <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>{title}</Typography>
          )}
          {children}
        </Pressable>
      </View>
    </Modal>
  )
}

const createStyles = (colors: ThemeColors) => ({
  root: {
    flex: 1,
    justifyContent: "flex-end" as const,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    gap: spacing[4],
    maxHeight: SHEET_MAX_HEIGHT,
    paddingBottom: SHEET_PADDING_BOTTOM,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
  },
  handle: {
    alignSelf: "center" as const,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    height: spacing[1],
    width: spacing[10],
  },
})
