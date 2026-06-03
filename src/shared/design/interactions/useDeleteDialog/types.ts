import { type Action } from "../types"

export type UseDeleteDialogProps<T> = {
  onConfirm: (entity: T) => void
  title?: string
  message?: string
}

export type UseDeleteDialogState<T> = {
  action: (entity: T) => Action<T>
  open: boolean
  title: string
  message?: string
  handleSubmit: () => void
  handleClose: () => void
}
