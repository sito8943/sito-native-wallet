import { useCallback } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import { type Action, ACTION_ID } from "#design/interactions"
import { useI18n } from "#shared/i18n"

import { type Account } from "../../Account"

import { type UseTransferActionProps } from "./types"

export default function useTransferAction({
  onPress,
}: UseTransferActionProps): {
  action: (account: Account) => Action<Account>
} {
  const { t } = useI18n()
  const action = useCallback(
    (account: Account): Action<Account> => ({
      sticky: true,
      id: ACTION_ID.TRANSFER,
      icon: APP_ICONS.transfer,
      accessibilityLabel: t("accounts.transfer.title"),
      onPress: () => {
        onPress(account)
      },
    }),
    [onPress, t],
  )

  return { action }
}
