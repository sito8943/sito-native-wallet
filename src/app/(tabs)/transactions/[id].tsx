import { type ReactElement } from "react"

import { TransactionDetailScreen } from "#features/transactions"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditTransaction(): ReactElement {
  const { id } = useDetailRouteParams()

  return <TransactionDetailScreen id={id} />
}
