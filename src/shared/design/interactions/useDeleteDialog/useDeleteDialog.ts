import { useCallback, useState } from "react"

import { useI18n } from "#shared/i18n"

import { useDeleteAction } from "../useDeleteAction"

import { useDialog } from "../useDialog"

import { type UseDeleteDialogProps, type UseDeleteDialogState } from "./types"

// Composes a delete action with a confirmation dialog: the action opens the
// dialog (it does NOT delete); handleSubmit runs the confirmed deletion.
export default function useDeleteDialog<T>({
  onConfirm,
  title,
  message,
}: UseDeleteDialogProps<T>): UseDeleteDialogState<T> {
  const { t } = useI18n()
  const { open, handleOpen, handleClose } = useDialog()
  const [target, setTarget] = useState<T | null>(null)

  const onPress = useCallback(
    (entity: T) => {
      setTarget(entity)
      handleOpen()
    },
    [handleOpen],
  )

  const { action } = useDeleteAction<T>({ onPress })

  const close = useCallback(() => {
    setTarget(null)
    handleClose()
  }, [handleClose])

  const handleSubmit = useCallback(() => {
    if (target !== null) {
      onConfirm(target)
    }
    close()
  }, [close, onConfirm, target])

  return {
    action,
    open,
    title: title ?? t("common.delete"),
    message,
    handleSubmit,
    handleClose: close,
  }
}
