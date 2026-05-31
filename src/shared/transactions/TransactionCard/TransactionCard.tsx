import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { CategoryBullet, TRANSACTION_TYPE } from "#shared/categories"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { getTransactionType } from "../Transaction"
import { TransactionTypeBadge } from "../TransactionTypeBadge"

import { type TransactionCardProps } from "./types"

export default function TransactionCard({
  onPress,
  transaction,
}: TransactionCardProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const type = getTransactionType(transaction)
  const amountStyle =
    type === TRANSACTION_TYPE.INCOME ? styles.amountPositive : styles.amountNegative

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
          <Typography variant={TYPOGRAPHY_VARIANT.CAPTION} tone={TYPOGRAPHY_TONE.SUBTLE}>
            {transaction.date}
          </Typography>
        </View>
        <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG} style={amountStyle}>
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

const createStyles = (colors: ThemeColors) => ({
  card: {
    padding: spacing[2],
    borderRadius: radius.md,
  },
  header: {
    alignItems: "flex-start" as const,
    flexDirection: "row" as const,
    gap: spacing[3],
    justifyContent: "space-between" as const,
  },
  titleGroup: {
    flex: 1,
    gap: spacing[1],
  },
  summaryGroup: {
    flexDirection: "row" as const,
    gap: spacing[2],
    alignItems: "center" as const,
  },
  amountPositive: { color: colors.positive },
  amountNegative: { color: colors.negative },
  categories: {
    flexDirection: "row" as const,
    marginTop: -spacing[1],
  },
  category: {
    marginLeft: -spacing[1],
  },
})
