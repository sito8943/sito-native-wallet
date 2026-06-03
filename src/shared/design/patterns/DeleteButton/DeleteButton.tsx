import { type ReactElement } from "react"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"

import { type DeleteButtonProps } from "./types"

// Shared destructive action: a DANGER-variant button defaulting to "Delete".
// Passed into a Form's extraActions by screens/forms that support deletion.
export default function DeleteButton({
  onPress,
  label = "Delete",
  loading = false,
  disabled = false,
}: DeleteButtonProps): ReactElement {
  return (
    <Button
      label={label}
      variant={BUTTON_VARIANT.DANGER}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
    />
  )
}
