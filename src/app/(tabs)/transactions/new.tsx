import { useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"

import { NewTransactionScreen } from "#features/transactions"

export default function NewTransaction(): ReactElement {
  // Optional pre-selected account (e.g. from the dashboard current-balance card).
  const { accountId } = useLocalSearchParams<{ accountId?: string }>()

  return (
    <NewTransactionScreen
      accountId={accountId !== undefined ? Number(accountId) : undefined}
    />
  )
}
