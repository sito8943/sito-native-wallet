import { useCallback, useState } from "react"

import { type Account } from "../Account"
import { useAdjustBalanceAction } from "../useAdjustBalanceAction"

import {
  type UseAdjustBalanceSheetProps,
  type UseAdjustBalanceSheetState,
} from "./types"

// Bundles the adjust-balance flow (the card action + sheet open state + submit)
// behind one hook, mirroring useDeleteDialog. The screen just spreads
// `sheetProps` and uses `action`. Domain crossing (creating the transaction)
// is injected via onAdjust, so this stays inside the accounts domain.
export default function useAdjustBalanceSheet({
  onAdjust,
}: UseAdjustBalanceSheetProps): UseAdjustBalanceSheetState {
  const [adjusting, setAdjusting] = useState<Account | null>(null)
  const { action } = useAdjustBalanceAction({ onPress: setAdjusting })

  const onClose = useCallback(() => {
    setAdjusting(null)
  }, [])

  const onSubmit = useCallback(
    (newBalance: number, description?: string) => {
      if (adjusting !== null) {
        onAdjust(adjusting, newBalance, description)
      }
    },
    [adjusting, onAdjust],
  )

  return {
    action,
    sheetProps: {
      account: adjusting,
      open: adjusting !== null,
      onClose,
      onSubmit,
    },
  }
}
