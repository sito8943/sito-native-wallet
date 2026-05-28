import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"
import {
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
    <Page>
      <AccountCard account={account} />

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
  )
}

const styles = {
  heading: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
}
