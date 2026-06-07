import { type ReactElement } from "react"
import { View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import AutoBadge from "#design/patterns/AutoBadge"
import EntityCard from "#design/patterns/EntityCard"
import { useThemedStyles, type ThemeColors } from "#design/theme"
import { CategoryBullet, TRANSACTION_TYPE } from "#features/categories"

import { getTransactionType } from "../Transaction"
import { TransactionTypeBadge } from "../TransactionTypeBadge"

import { type TransactionCardProps } from "./types"

export default function TransactionCard({
  actions,
  onPress,
  transaction,
}: TransactionCardProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const type = getTransactionType(transaction)
  const amountStyle =
    type === TRANSACTION_TYPE.INCOME
      ? styles.amountPositive
      : styles.amountNegative
  const handlePress =
    onPress === undefined ? undefined : () => onPress(transaction)

  return (
    <EntityCard
      actions={actions}
      entity={transaction}
      style={styles.card}
      onPress={handlePress}
    >
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
          <View style={styles.footer}>
            {transaction.auto === true && (
              <>
                <AutoBadge />
                <Typography variant={TYPOGRAPHY_VARIANT.BODY}>·</Typography>
              </>
            )}
            <Typography
              variant={TYPOGRAPHY_VARIANT.CAPTION}
              tone={TYPOGRAPHY_TONE.SUBTLE}
            >
              {transaction.date}
            </Typography>
          </View>
        </View>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          style={amountStyle}
        >
          {transaction.amount.toFixed(2)} {transaction.account.currencySymbol}
        </Typography>
      </View>
    </EntityCard>
  )
}

const createStyles = (colors: ThemeColors) => ({
  card: {
    padding: spacing(2),
  },
  header: {
    alignItems: "flex-start" as const,
    flexDirection: "row" as const,
    gap: spacing(3),
    justifyContent: "space-between" as const,
  },
  titleGroup: {
    flex: 1,
    gap: spacing(1),
  },
  summaryGroup: {
    flexDirection: "row" as const,
    gap: spacing(2),
    alignItems: "center" as const,
  },
  footer: {
    flexDirection: "row" as const,
    gap: spacing(1),
    alignItems: "center" as const,
  },
  amountPositive: { color: colors.positive },
  amountNegative: { color: colors.negative },
  categories: {
    flexDirection: "row" as const,
    marginTop: -spacing(1),
  },
  category: {
    marginLeft: -spacing(1),
  },
})
