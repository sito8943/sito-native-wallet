import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type AccountCardPropsType } from "./types"

export default function AccountCard({
  account,
}: AccountCardPropsType): ReactElement {
  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Typography variant="title">{account.name}</Typography>
          <Typography variant="caption">
            {account.currency.name} · {account.currency.symbol}
          </Typography>
        </View>

        <Typography variant="bodyStrong">
          {account.balance.toFixed(2)} {account.currency.symbol}
        </Typography>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    gap: spacing.xxs,
  },
})
