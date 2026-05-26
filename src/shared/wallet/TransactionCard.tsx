import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import CategoryBullet from "./CategoryBullet"
import TransactionTypeBadge from "./TransactionTypeBadge"
import { type TransactionCardPropsType } from "./types"
import { getTransactionType } from "./utils"

const TransactionCard = (props: TransactionCardPropsType): ReactElement => {
  const { onPress, transaction } = props

  const content = (
    <Card key={transaction.id}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Typography variant="title">{transaction.description}</Typography>
          <Typography variant="caption" tone="subtle">
            {transaction.date}
          </Typography>
        </View>
        <TransactionTypeBadge type={getTransactionType(transaction)} />
      </View>

      <Typography variant="bodyStrong" style={styles.amount}>
        {transaction.amount.toFixed(2)} {transaction.currency.symbol}
      </Typography>

      <View style={styles.categories}>
        {transaction.categories.map((category) => (
          <CategoryBullet key={category.id} category={category} />
        ))}
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(transaction)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  titleGroup: {
    flex: 1,
    gap: spacing.xxs,
  },
  amount: {
    marginTop: spacing.sm - 2,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm - 2,
    marginTop: spacing.sm - 2,
  },
})

export default TransactionCard
