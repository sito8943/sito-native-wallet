import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import { TRANSACTION_TYPE_COLORS, TRANSACTION_TYPE_LABELS } from "./constants"
import { type TransactionTypeBadgePropsType } from "./types"

export default function TransactionTypeBadge({
  type,
}: TransactionTypeBadgePropsType): ReactElement {
  return (
    <View
      style={[styles.badge, { backgroundColor: TRANSACTION_TYPE_COLORS[type] }]}
    >
      <Text style={styles.label}>{TRANSACTION_TYPE_LABELS[type]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
})
