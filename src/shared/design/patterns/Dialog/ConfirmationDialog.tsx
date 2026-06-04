import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useI18n } from "#shared/i18n"

import Dialog from "./Dialog"
import { type ConfirmationDialogProps } from "./types"

export default function ConfirmationDialog({
  open,
  title,
  handleSubmit,
  handleClose,
  message,
  confirmLabel,
  cancelLabel,
  isLoading = false,
}: ConfirmationDialogProps): ReactElement {
  const { t } = useI18n()

  return (
    <Dialog open={open} title={title} onClose={handleClose}>
      {message != null && (
        <Typography
          tone={TYPOGRAPHY_TONE.MUTED}
          variant={TYPOGRAPHY_VARIANT.BODY}
        >
          {message}
        </Typography>
      )}
      <View style={styles.actions}>
        <Button
          accessibilityLabel={cancelLabel ?? t("common.cancel")}
          disabled={isLoading}
          variant={BUTTON_VARIANT.OUTLINED}
          onPress={handleClose}
        >
          {cancelLabel ?? t("common.cancel")}
        </Button>
        <Button
          accessibilityLabel={confirmLabel ?? t("common.confirm")}
          loading={isLoading}
          variant={BUTTON_VARIANT.DANGER}
          onPress={handleSubmit}
        >
          {confirmLabel ?? t("common.confirm")}
        </Button>
      </View>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: spacing(3),
    justifyContent: "flex-end",
  },
})
