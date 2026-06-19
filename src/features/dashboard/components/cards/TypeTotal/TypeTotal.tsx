import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, typography, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { TransactionTypeBadge } from "#features/transactions"

import { formatAmount } from "../../utils"

import { type TypeTotalProps } from "./types"

// Type badge + formatted total for one transaction type. Reused for the primary
// and opposite totals on the TypeResume card; `variant` sets the amount's size
// and `tone` its color (the badge colors itself from `type`).
export default function TypeTotal({
  type,
  amount,
  symbol,
  tone,
  variant = TYPOGRAPHY_VARIANT.DISPLAY,
}: TypeTotalProps): ReactElement {
  return (
    <View style={styles.row}>
      <TransactionTypeBadge
        type={type}
        showText={false}
        filled={false}
        style={styles.badge}
        // Icon scales with the amount's text size (smaller variant → smaller
        // icon), so the opposite total reads as secondary.
        iconStyle={{ fontSize: typography[variant].fontSize }}
      />
      <Typography variant={variant} style={{ color: tone }}>
        {formatAmount(amount, symbol)}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing(2),
  },
  // No chip background here — just the colored icon next to the amount.
  badge: {
    backgroundColor: "transparent",
  },
})
