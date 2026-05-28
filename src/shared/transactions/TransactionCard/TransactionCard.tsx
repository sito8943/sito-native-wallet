import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import { CategoryBullet } from "#shared/categories"

import { useThemeColors } from "#shared/theme"

import { getTransactionType } from "../Transaction"
import { TransactionTypeBadge } from "../TransactionTypeBadge"

import { type TransactionCardProps } from "./types"

export default function TransactionCard({
  onPress,
  transaction,
}: TransactionCardProps): ReactElement {
  const colors = useThemeColors()
  const type = getTransactionType(transaction)
  const content = (
    <Card key={transaction.id} style={styles.card}>
      <View style={styles.header}>
        <TransactionTypeBadge type={type} filled={false} showText={false} />
        <View style={styles.titleGroup}>
          <View style={styles.summaryGroup}>
            <View style={styles.categories}>
              {transaction.categories.map((category, i) => (
                <CategoryBullet
                  key={category.id}
                  color={category.color}
                  style={i > 0 ? styles.category : undefined}
                />
              ))}
            </View>
            <Typography>{transaction.description}</Typography>
          </View>
          <Typography variant="caption" tone="subtle">
            {transaction.date}
          </Typography>
        </View>
        <Typography
          variant="bodyStrong"
          style={[
            styles.amount,
            {
              color: type ? colors.positive : colors.negative,
            },
          ]}
        >
          {transaction.amount.toFixed(2)} {transaction.account.currency.symbol}
        </Typography>
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(transaction)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.xs,
    borderRadius: radius.md,
  },
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
  summaryGroup: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
  },
  amount: {},
  categories: {
    flexDirection: "row",
    marginTop: -spacing.xxs,
  },
  category: {
    marginLeft: -spacing.xxs,
  },
})
