import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountSelector } from "#features/accounts"
import {
  type Transaction,
  TransactionList,
  TransactionsFilters,
  useFilteredTransactions,
  useInfiniteTransactions,
  useTransactions,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"
import {
  toNewTransactionRoute,
  toTransactionDetailsRoute,
} from "#shared/navigation"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const {
    accounts,
    error,
    isLoading,
    preferences,
    filters,
    query,
    setAccountId,
    setSortOrder,
    setTypeFilter,
  } = useFilteredTransactions()

  const { items, hasNextPage, fetchNextPage } = useInfiniteTransactions({
    filters,
    query,
  })

  const { removeTransaction } = useTransactions()

  const deleteDialog = useDeleteDialog<Transaction>({
    onConfirm: (transaction) => {
      removeTransaction(transaction.id)
    },
    title: t("transactions.delete.title"),
    message: t("transactions.delete.description"),
  })

  // Every row is swipe-deletable, including auto rows (opening balance / balance
  // adjustments): remove() reverts the account balance, so the ledger stays
  // consistent.
  const onSwipeDelete = (transaction: Transaction) => () => {
    deleteDialog.action(transaction).onPress(transaction)
  }

  const header = (
    <View style={styles.header}>
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
          {t("transactions.preferences.error")}
        </Typography>
      ) : null}
    </View>
  )

  return (
    <View style={styles.screen}>
      <Page>
        <TransactionList
          data={items}
          header={header}
          emptyMessage={
            isLoading
              ? t("transactions.empty.loading")
              : t("transactions.empty.filtered")
          }
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage()
            }
          }}
          onPress={(transaction) =>
            router.push(toTransactionDetailsRoute(transaction.id))
          }
          onSwipeDelete={onSwipeDelete}
        />
      </Page>
      <FAB
        accessibilityLabel={t("transactions.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewTransactionRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    gap: spacing(2),
  },
})
