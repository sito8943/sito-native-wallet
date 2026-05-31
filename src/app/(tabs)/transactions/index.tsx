import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountSelector } from "#shared/accounts"
import { useDeleteDialog } from "#shared/dialogs"
import {
  toNewTransactionRoute,
  toTransactionDetailsRoute,
} from "#shared/navigation"
import {
  type Transaction,
  TransactionList,
  TransactionsFilters,
  useFilteredTransactions,
  useTransactions,
} from "#shared/transactions"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const { removeTransaction } = useTransactions()
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

  const deleteDialog = useDeleteDialog<Transaction>({
    onConfirm: (transaction) => {
      removeTransaction(transaction.id)
    },
    title: "Delete transaction",
    message: "This transaction will be removed permanently.",
  })

  return (
    <View style={{ flex: 1 }}>
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
          actionsFor={(transaction) => [deleteDialog.action(transaction)]}
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
      <FAB
        accessibilityLabel="Add transaction"
        icon="plus"
        onPress={() => router.push(toNewTransactionRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel="Delete" />
    </View>
  )
}
