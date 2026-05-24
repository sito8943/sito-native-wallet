import { type ReactElement } from "react"

import { View, Text, StyleSheet } from "react-native"

import { getTransactionType } from "../../../hooks/useTransactions/utils"
import Card from "../../ui/Card"
import CategoryBullet from "../CategoryBullet"
import TransactionTypeBadge from "../TransactionTypeBadge"

import { type TransactionCardPropsType } from "./types"

const TransactionCard = (props: TransactionCardPropsType): ReactElement => {
  const { transaction } = props
  return (
    <Card key={transaction.id}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
        <TransactionTypeBadge type={getTransactionType(transaction)} />
      </View>

      <Text style={styles.amount}>
        {transaction.amount.toFixed(2)} {transaction.currency.symbol}
      </Text>

      <View style={styles.categories}>
        {transaction.categories.map((category) => (
          <CategoryBullet key={category.id} category={category} />
        ))}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  titleGroup: {
    flex: 1,
    gap: 4,
  },
  description: {
    color: "#1f2933",
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  amount: {
    color: "#1f2933",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
})

export default TransactionCard
