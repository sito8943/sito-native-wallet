import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"

import { type AccountCardProps } from "./types"

export default function AccountCard({
  account,
  onPress,
}: AccountCardProps): ReactElement {
  const content = (
    <Card>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {account.name}
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.CAPTION}>
            {account.currency.name} · {account.currency.symbol}
          </Typography>
        </View>

        <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG}>
          {account.balance.toFixed(2)} {account.currency.symbol}
        </Typography>
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(account)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[3],
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    gap: spacing[1],
  },
})
