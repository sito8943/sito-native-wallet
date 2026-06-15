import { type ReactNode } from "react"

export type DialogProps = {
  open: boolean
  title: string
  // Omit/undefined to make the dialog non-dismissible (no backdrop/back close),
  // e.g. while an action is in flight.
  onClose?: () => void
  children?: ReactNode
}

export type ConfirmationDialogProps = {
  open: boolean
  title: string
  handleSubmit: () => void
  handleClose: () => void
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
}
