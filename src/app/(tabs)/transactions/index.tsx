import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { TransactionList, useTransactions } from "#shared/wallet"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const { data } = useTransactions()

  return (
    <View style={styles.container}>
      <TransactionList
        data={data ?? undefined}
        onTransactionPress={(transaction) =>
          router.push({
            pathname: "/transactions/[id]",
            params: { id: transaction.id },
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
})
