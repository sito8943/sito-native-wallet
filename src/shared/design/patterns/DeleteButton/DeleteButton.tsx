import { type ReactElement } from "react"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import { useI18n } from "#shared/i18n"

import { type DeleteButtonProps } from "./types"

// Shared destructive action: a DANGER-variant button defaulting to "Delete".
// Passed into a Form's extraActions by screens/forms that support deletion.
export default function DeleteButton({
  onPress,
  label,
  loading = false,
  disabled = false,
}: DeleteButtonProps): ReactElement {
  const { t } = useI18n()

  return (
    <Button
      accessibilityLabel={label ?? t("common.delete")}
      variant={BUTTON_VARIANT.DANGER}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
    >
      {label ?? t("common.delete")}
    </Button>
  )
}
