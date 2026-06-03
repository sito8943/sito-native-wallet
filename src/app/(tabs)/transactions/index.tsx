import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountSelector } from "#shared/accounts"
import {
  toNewTransactionRoute,
  toTransactionDetailsRoute,
} from "#shared/navigation"
import {
  TransactionList,
  TransactionsFilters,
  useFilteredTransactions,
  useInfiniteTransactions,
} from "#shared/transactions"

export default function Transactions(): ReactElement {
  const router = useRouter()
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
          Saved preferences could not be loaded. Default filters are active.
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
              ? "Loading saved transaction view..."
              : "No transactions match your saved filters."
          }
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage()
            }
          }}
          onPress={(transaction) =>
            router.push(toTransactionDetailsRoute(transaction.id))
          }
        />
      </Page>
      <FAB
        accessibilityLabel="Add transaction"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewTransactionRoute())}
      />
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
