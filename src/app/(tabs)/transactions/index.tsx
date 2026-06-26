import { useRouter } from "expo-router"
import { useEffect, useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { useThemeColors } from "#design/theme"
import { AccountCarousel } from "#features/accounts"
import {
  type Transaction,
  TransactionList,
  TransactionsFilterSheet,
  TransactionsSummary,
  useFilteredTransactions,
  useInfiniteTransactions,
  useTransactions,
  useTransactionsGroupedByType,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"
import {
  toAccountDetailsRoute,
  toNewTransactionRoute,
  toTransactionDetailsRoute,
} from "#shared/navigation"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const colors = useThemeColors()
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
  const [filtersOpen, setFiltersOpen] = useState(false)

  // The carousel shows only real accounts (no "all" page), so keep one selected:
  // default to the first account once they load if none is chosen yet.
  useEffect(() => {
    if (preferences.accountId === 0 && accounts.length > 0) {
      setAccountId(accounts[0].id)
    }
  }, [preferences.accountId, accounts, setAccountId])

  const selectedAccount =
    accounts.find((account) => account.id === preferences.accountId) ?? null
  const symbol = selectedAccount?.currency.symbol ?? ""

  // Same grouped-by-type contract as the web account summary: current month,
  // selected account, balance anchor and backend auto/manual-category rules.
  const { incomeTotal: income, expenseTotal: expense } =
    useTransactionsGroupedByType(selectedAccount)

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

  const filterButton = (
    <IconButton
      accessibilityLabel={t("transactions.filters.title")}
      icon={APP_ICONS.filter}
      variant={ICON_BUTTON_VARIANT.TEXT}
      size={ICON_BUTTON_SIZE.LG}
      color={colors.textMuted}
      onPress={() => {
        setFiltersOpen(true)
      }}
    />
  )

  const header = (
    <View style={styles.header}>
      {accounts.length > 0 ? (
        <View style={styles.accountCarousel}>
          <AccountCarousel
            accounts={accounts}
            selectedId={preferences.accountId}
            onSelect={setAccountId}
            onPressAccount={(account) => {
              router.push(toAccountDetailsRoute(account.id))
            }}
            action={filterButton}
          />
        </View>
      ) : null}

      <TransactionsSummary income={income} expense={expense} symbol={symbol} />

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
      <TransactionsFilterSheet
        open={filtersOpen}
        preferences={preferences}
        setSortOrder={setSortOrder}
        setTypeFilter={setTypeFilter}
        onClose={() => {
          setFiltersOpen(false)
        }}
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
    gap: spacing(4),
  },
  // EntityList insets every row/header by spacing(4). Let the carousel viewport
  // reach those list edges; AccountCarousel supplies its own centred-card inset
  // so neighbouring cards peek symmetrically, matching the web slider.
  accountCarousel: {
    marginHorizontal: -spacing(4),
  },
})
