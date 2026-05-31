import { useCallback, useState } from "react"

type UseDialogState = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

// Primitive open/close state for any dialog.
export default function useDialog(): UseDialogState {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return { open, handleOpen, handleClose }
}
