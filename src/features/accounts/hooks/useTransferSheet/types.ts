import { type Action } from "#design/interactions"

import { type Account } from "../../Account"
import { type AccountTransferSheetProps } from "../../components/AccountTransferSheet"

export type UseTransferSheetProps = {
  onTransfer: (
    account: Account,
    toAccountId: number,
    amount: number,
    date: string,
    description?: string,
  ) => void
}

export type UseTransferSheetState = {
  action: (account: Account) => Action<Account>
  sheetProps: AccountTransferSheetProps
}
