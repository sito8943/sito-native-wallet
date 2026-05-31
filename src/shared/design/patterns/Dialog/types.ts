import { type ReactNode } from "react"

export type DialogProps = {
  open: boolean
  title: string
  onClose: () => void
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
