import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import Page from "#design/templates/Page"
import { AccountSelector } from "#shared/accounts"
import { toTransactionDetailsRoute } from "#shared/navigation"
import {
  TransactionList,
  TransactionsFilters,
  useFilteredTransactions,
} from "#shared/transactions"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const {
    accounts,
    data,
    error,
    isLoading,
    preferences,
    setAccountId,
    setSortOrder,
    setTypeFilter,
  } = useFilteredTransactions()

  return (
    <Page>
      <TransactionsFilters
        preferences={preferences}
        setSortOrder={setSortOrder}
        setTypeFilter={setTypeFilter}
      />

      <AccountSelector
        accounts={accounts}
        selectedId={preferences.accountId}
        onSelect={setAccountId}
      />

      {error ? (
        <Typography tone={TYPOGRAPHY_TONE.MUTED}>
          Saved preferences could not be loaded. Default filters are active.
        </Typography>
      ) : null}

      <TransactionList
        data={data ?? undefined}
        emptyMessage={
          isLoading
            ? "Loading saved transaction view..."
            : "No transactions match your saved filters."
        }
        onPress={(transaction) =>
          router.push(toTransactionDetailsRoute(transaction.id))
        }
      />
    </Page>
  )
}
