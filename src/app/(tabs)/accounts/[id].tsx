import { useLocalSearchParams, useRouter } from "expo-router"
import { type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"
import { TransactionList, useTransactions } from "#shared/transactions"

export default function AccountDetails(): ReactElement {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: accounts } = useAccounts()
  const { data: transactions } = useTransactions()

  const account = accounts?.find((item) => item.id === id)
  const accountTransactions =
    transactions?.filter((transaction) => transaction.account.id === id) ?? []

  if (account === undefined) {
    return (
      <Page centered>
        <Typography variant="bodyStrong" tone="muted">
          Account not found
        </Typography>
      </Page>
    )
  }

  return (
    <Page>
      <AccountCard account={account} />

      <Typography variant="title" style={styles.heading}>
        Transactions ({accountTransactions.length})
      </Typography>

      <TransactionList
        data={accountTransactions}
        onTransactionPress={(transaction) =>
          router.push({
            pathname: "/transactions/[id]",
            params: { id: transaction.id },
          })
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
