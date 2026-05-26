import { useLocalSearchParams, useRouter } from "expo-router"
import { type ReactElement } from "react"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import { AccountCard, TransactionList, useAccounts, useTransactions } from "#shared/wallet"

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

      <Card style={styles.summary}>
        <Typography variant="label">Balance</Typography>
        <Typography variant="body">
          {account.balance.toFixed(2)} {account.currency.symbol}
        </Typography>

        <Typography variant="label">Currency</Typography>
        <Typography variant="body">{account.currency.name}</Typography>

        <Typography variant="label">Transactions</Typography>
        <Typography variant="body">{accountTransactions.length}</Typography>
      </Card>

      <Typography variant="title" style={styles.heading}>
        Transactions
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
  summary: {
    gap: spacing.xxs,
    paddingVertical: spacing.sm,
  },
  heading: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
}
