import { type ReactElement } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { useThemeColors } from "#design/theme"
import { TransactionCard, useTransactionsList } from "#features/transactions"
import { SORT_ORDER } from "#shared/data"
import { useI18n } from "#shared/i18n"

import { RECENT_LIMIT, RECENT_LIST_MAX_HEIGHT } from "./constants"
import { type RecentTransactionsSheetProps } from "./types"

// Bottom sheet listing the transactions behind a card's total (same filters),
// newest first — the web wallet's "recent transactions" dialog. A ScrollView
// (not the virtualized list) keeps a definite, scrollable height inside the
// content-sized sheet; the count is capped, so virtualization isn't needed.
export default function RecentTransactionsSheet({
  open,
  onClose,
  filters,
  title,
}: RecentTransactionsSheetProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const { result } = useTransactionsList({
    filters,
    query: {
      sortingBy: "date",
      sortingOrder: SORT_ORDER.DESC,
      pageSize: RECENT_LIMIT,
    },
  })
  const items = result.items

  return (
    <BottomSheet open={open} title={title} onClose={onClose}>
      {items.length === 0 ? (
        <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
          {t("transactions.empty.default")}
        </Typography>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={styles.content}>
          {items.map((transaction, index) => (
            <View
              key={transaction.id}
              style={
                index < items.length - 1
                  ? [styles.divider, { borderBottomColor: colors.border }]
                  : undefined
              }
            >
              <TransactionCard transaction={transaction} flat />
            </View>
          ))}
        </ScrollView>
      )}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  list: {
    maxHeight: RECENT_LIST_MAX_HEIGHT,
  },
  content: {
    gap: 0,
  },
  divider: {
    borderBottomWidth: 1,
  },
})
