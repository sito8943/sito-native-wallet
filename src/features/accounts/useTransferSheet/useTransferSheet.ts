import { useCallback, useState } from "react"

import { type Account } from "../Account"
import { useTransferAction } from "../useTransferAction"

import {
  type UseTransferSheetProps,
  type UseTransferSheetState,
} from "./types"

export default function useTransferSheet({
  onTransfer,
}: UseTransferSheetProps): UseTransferSheetState {
  const [transferring, setTransferring] = useState<Account | null>(null)
  const { action } = useTransferAction({ onPress: setTransferring })

  const onClose = useCallback(() => {
    setTransferring(null)
  }, [])

  const onSubmit = useCallback(
    (
      toAccountId: number,
      amount: number,
      date: string,
      description?: string,
    ) => {
      if (transferring !== null) {
        onTransfer(transferring, toAccountId, amount, date, description)
      }
    },
    [onTransfer, transferring],
  )

  return {
    action,
    sheetProps: {
      account: transferring,
      open: transferring !== null,
      onClose,
      onSubmit,
    },
  }
}
