import { useCallback } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import { type Action, ACTION_ID } from "#design/interactions"

import { type Account } from "../Account"

import { type UseAdjustBalanceActionProps } from "./types"

// Factory hook mirroring useDeleteAction: returns an action(account) builder
// pre-filled with adjust-balance defaults. The screen supplies onPress (open
// the adjust sheet) and composes it into the card's actions.
export default function useAdjustBalanceAction({
  onPress,
}: UseAdjustBalanceActionProps): {
  action: (account: Account) => Action<Account>
} {
  const action = useCallback(
    (account: Account): Action<Account> => ({
      id: ACTION_ID.ADJUST_BALANCE,
      icon: APP_ICONS.adjustBalance,
      accessibilityLabel: "Adjust balance",
      onPress: () => {
        onPress(account)
      },
    }),
    [onPress],
  )

  return { action }
}
