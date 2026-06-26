import { type Action } from "#design/interactions"

import { type Account } from "../../Account"
import { type AccountAdjustBalanceSheetProps } from "../../components/AccountAdjustBalanceSheet"

export type UseAdjustBalanceSheetProps = {
  // Injected by the screen (which knows both domains): turns the chosen target
  // balance into an adjustment. Kept as a callback so this account hook never
  // imports #features/transactions (that would close an accounts ↔ transactions
  // import cycle — transactions already depends on accounts).
  onAdjust: (account: Account, newBalance: number, description?: string) => void
}

export type UseAdjustBalanceSheetState = {
  action: (account: Account) => Action<Account>
  sheetProps: AccountAdjustBalanceSheetProps
}
