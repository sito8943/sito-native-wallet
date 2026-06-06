import { type ReactElement } from "react"

import { TransactionDetailScreen } from "#features/transactions"
import { useDetailRouteParams } from "#shared/navigation"

// Same transaction detail screen, but mounted inside the accounts stack so the
// back button returns to the account details screen instead of jumping to the
// transactions tab.
export default function AccountTransactionDetails(): ReactElement {
  const { id } = useDetailRouteParams()

  return <TransactionDetailScreen id={id} />
}
