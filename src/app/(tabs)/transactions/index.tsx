import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import Page from "#design/templates/Page"
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
    resetPreferences,
    setAccountId,
    setSortOrder,
    setTypeFilter,
  } = useFilteredTransactions()

  return (
    <Page>
      <TransactionsFilters
        accounts={accounts}
        preferences={preferences}
        resetPreferences={resetPreferences}
        setAccountId={setAccountId}
        setSortOrder={setSortOrder}
        setTypeFilter={setTypeFilter}
      />

      {error ? (
        <Typography tone="muted">
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
        onTransactionPress={(transaction) =>
          router.push(toTransactionDetailsRoute(transaction.id))
        }
      />
    </Page>
  )
}
