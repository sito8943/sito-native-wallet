import { useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Page from "#design/templates/Page"
import { TransactionCard, useTransactions } from "#shared/wallet"

export default function TransactionDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data } = useTransactions()
  const transaction = data?.find((item) => item.id === id)

  if (transaction === undefined) {
    return (
      <Page centered>
        <Typography variant="bodyStrong" tone="muted">
          Transaction not found
        </Typography>
      </Page>
    )
  }

  return (
    <Page>
      <TransactionCard transaction={transaction} />

      <Card style={styles.details}>
        <Typography variant="label">Amount</Typography>
        <Typography variant="body">
          {transaction.amount.toFixed(2)} {transaction.currency.symbol}
        </Typography>

        <Typography variant="label">Currency</Typography>
        <Typography variant="body">{transaction.currency.name}</Typography>

        <Typography variant="label">Categories</Typography>
        <Typography variant="body">
          {transaction.categories.map((category) => category.name).join(", ")}
        </Typography>
      </Card>
    </Page>
  )
}

const styles = StyleSheet.create({
  details: {
    gap: spacing.xxs,
    paddingVertical: spacing.sm,
  },
})
