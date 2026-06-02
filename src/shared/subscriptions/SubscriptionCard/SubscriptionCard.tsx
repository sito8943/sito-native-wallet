import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"

import { daysUntilRenewal, formatBillingCycle } from "../Subscription"

import { type SubscriptionCardProps } from "./types"
import { renewalLabel } from "./utils"

export default function SubscriptionCard({
  subscription,
  onPress,
}: SubscriptionCardProps): ReactElement {
  const days = daysUntilRenewal(subscription)

  const content = (
    <Card>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {subscription.name}
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.CAPTION}>
            {subscription.provider.name} · {formatBillingCycle(subscription)}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANT.CAPTION}
            tone={TYPOGRAPHY_TONE.MUTED}
          >
            {renewalLabel(days)}
          </Typography>
        </View>

        <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG}>
          {subscription.amount.toFixed(2)} {subscription.currency.symbol}
        </Typography>
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(subscription)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(3),
    justifyContent: "space-between",
  },
  copy: {
    flex: 1,
    gap: spacing(1),
  },
})
