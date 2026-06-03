import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"
import {
  toEditAccountRoute,
  toTransactionDetailsRoute,
  useDetailRouteParams,
} from "#shared/navigation"
import { TransactionList, useTransactions } from "#shared/transactions"

export default function AccountDetails(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data: accounts } = useAccounts()
  const { data: transactions } = useTransactions()

  const account = accounts?.find((item) => item.id === id)
  const accountTransactions =
    transactions?.filter((transaction) => transaction.account.id === id) ?? []

  if (account === undefined) {
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
    <View style={{ flex: 1 }}>
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
          Transactions ({accountTransactions.length})
        </Typography>

        <TransactionList
          data={accountTransactions}
          onPress={(transaction) =>
            router.push(toTransactionDetailsRoute(transaction.id))
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

const styles = {
  description: {
    marginHorizontal: spacing(4),
    marginTop: spacing(1),
  },
  heading: {
    marginHorizontal: spacing(4),
    marginTop: spacing(3),
  },
}
