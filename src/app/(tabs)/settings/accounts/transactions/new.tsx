import { useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"

import { NewTransactionScreen } from "#features/transactions"

// Same add-transaction screen, but mounted inside the accounts stack so the
// back button returns to the account details screen instead of jumping to the
// transactions tab. The account is pre-selected from the route param.
export default function AccountNewTransaction(): ReactElement {
  const { accountId } = useLocalSearchParams<{ accountId?: string }>()

  return (
    <NewTransactionScreen
      accountId={accountId !== undefined ? Number(accountId) : undefined}
    />
  )
}
