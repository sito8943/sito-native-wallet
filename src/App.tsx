import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import { useTransactions } from "./hooks"
import TransactionList from "./TransactionList"

export default function App(): ReactElement {
  const { data } = useTransactions()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SitoWallet</Text>
      <TransactionList data={data ?? undefined} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    textAlign: "center",
  },
})
