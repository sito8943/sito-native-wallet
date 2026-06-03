import { type ReactElement } from "react"

import { useDetailRouteParams } from "#shared/navigation"
import { TransactionDetailScreen } from "#shared/transactions"

// Same transaction detail screen, but mounted inside the accounts stack so the
// back button returns to the account details screen instead of jumping to the
// transactions tab.
export default function AccountTransactionDetails(): ReactElement {
  const { id } = useDetailRouteParams()

  return <TransactionDetailScreen id={id} />
}
