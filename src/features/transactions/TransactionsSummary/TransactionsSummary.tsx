import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, {
  TYPOGRAPHY_TONE,
} from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type TransactionsSummaryProps } from "./types"

// "Entrada / Salida" summary: two flat pills with the income (positive) and
// expense (negative) totals for the scoped account, each with a trend arrow.
// Presentational — the screen computes the totals (useTransactionsTotal).
export default function TransactionsSummary({
  income,
  expense,
  symbol,
}: TransactionsSummaryProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()

  const pill = (
    label: string,
    amount: number,
    tone: string,
    icon: (typeof APP_ICONS)[keyof typeof APP_ICONS],
  ): ReactElement => (
    <Card flat style={styles.pill}>
      <Typography
        variant={TYPOGRAPHY_VARIANT.BODY}
        tone={TYPOGRAPHY_TONE.MUTED}
      >
        {label}
      </Typography>
      <View style={styles.value}>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={{ color: tone }}>
          {`${amount.toFixed(2)} ${symbol}`.trim()}
        </Typography>
        <Icon icon={icon} color={tone} size={spacing(4)} />
      </View>
    </Card>
  )

  return (
    <View style={styles.row}>
      {pill(
        t("transactions.summary.income"),
        income,
        colors.positive,
        APP_ICONS.in,
      )}
      {pill(
        t("transactions.summary.expense"),
        expense,
        colors.negative,
        APP_ICONS.out,
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing(3),
  },
  pill: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: spacing(2),
    justifyContent: "space-between",
  },
  value: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(1),
  },
})
