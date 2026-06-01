import { type ReactElement } from "react"
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { type BottomSheetProps } from "./types"

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

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={open}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityLabel="Close"
          style={styles.backdrop}
          onPress={onClose}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable style={styles.sheet}>
            <View style={styles.handle} />
            {title !== undefined && (
              <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
                {title}
              </Typography>
            )}
            {children}
          </Pressable>
        </KeyboardAvoidingView>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    gap: spacing[4],
    maxHeight: "85%" as const,
    paddingBottom: spacing[8],
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
