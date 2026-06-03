import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountCard, useAccount } from "#shared/accounts"
import {
  toAccountTransactionDetailsRoute,
  toEditAccountRoute,
  useDetailRouteParams,
} from "#shared/navigation"
import { TransactionList, useTransactions } from "#shared/transactions"

export default function AccountDetails(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data: account, isLoading } = useAccount(id)
  const { data: transactions } = useTransactions({ accountId: id })

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (account === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Account not found
        </Typography>
      </Page>
    )
  }

  return (
    <View style={styles.screen}>
      <Page>
        <AccountCard account={account} />

        {account.description !== undefined && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.BODY}
            tone={TYPOGRAPHY_TONE.MUTED}
            style={styles.description}
          >
            {account.description}
          </Typography>
        )}

        <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.heading}>
          Transactions ({transactions.length})
        </Typography>

        <TransactionList
          data={transactions}
          onPress={(transaction) =>
            router.push(toAccountTransactionDetailsRoute(transaction.id))
          }
        />
      </Page>
      <FAB
        accessibilityLabel="Edit account"
        icon={APP_ICONS.edit}
        onPress={() => router.push(toEditAccountRoute(account.id))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  description: {
    marginHorizontal: spacing(4),
    marginTop: spacing(1),
  },
  heading: {
    marginHorizontal: spacing(4),
    marginTop: spacing(3),
  },
})
