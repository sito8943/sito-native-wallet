import { useMemo, type ReactElement } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Accordion from "#design/patterns/Accordion"
import BottomSheet from "#design/patterns/BottomSheet"
import { useThemeColors } from "#design/theme"
import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { TransactionCard } from "#features/transactions"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"
import { useI18n } from "#shared/i18n"

import { formatAmount } from "../../../utils"

import { BREAKDOWN_BAR_HEIGHT, BREAKDOWN_LIST_MAX_HEIGHT } from "./constants"
import { type CategoryBreakdownSheetProps } from "./types"

// Bottom sheet breaking a card's total down by category: each row shows the
// category's amount and a proportion bar, and expands to its transactions.
// Mirrors the web wallet's type-resume categories dialog. Aggregation lives on
// the client; this subscribes to the stores so it recomputes on changes.
export default function CategoryBreakdownSheet({
  open,
  onClose,
  filters,
  symbol,
  title,
}: CategoryBreakdownSheetProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const client = useManager().Transactions
  const { items } = useClientStore(client)
  const { data: accounts } = useAccounts()
  const { data: categories } = useCategories()

  const filtersKey = JSON.stringify(filters)
  const breakdown = useMemo(
    () => client.categoryBreakdown(filters),
    // items/accounts/categories aren't read here (the client joins + sums), but
    // must re-trigger the memo when those stores change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, items, accounts, categories, filtersKey],
  )

  return (
    <BottomSheet open={open} title={title} onClose={onClose}>
      {breakdown.categories.length === 0 ? (
        <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
          {t("transactions.empty.default")}
        </Typography>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={styles.content}>
          {breakdown.categories.map((entry) => {
            const pct =
              breakdown.total > 0
                ? Math.min(
                    100,
                    Math.max(0, (entry.total / breakdown.total) * 100),
                  )
                : 0

            return (
              <Accordion
                key={entry.category.id}
                header={
                  <View style={styles.row}>
                    <View style={styles.rowTop}>
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: entry.category.color },
                        ]}
                      />
                      <Typography
                        variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
                        style={styles.name}
                      >
                        {entry.category.name}
                      </Typography>
                      <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
                        {formatAmount(entry.total, symbol)}
                      </Typography>
                    </View>
                    <View
                      style={[styles.track, { backgroundColor: colors.border }]}
                    >
                      <View
                        style={[
                          styles.bar,
                          {
                            width: `${pct}%`,
                            backgroundColor: entry.category.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                }
              >
                <View style={styles.transactions}>
                  {entry.transactions.map((transaction, index) => (
                    <View
                      key={transaction.id}
                      style={
                        index < entry.transactions.length - 1
                          ? [
                              styles.divider,
                              { borderBottomColor: colors.border },
                            ]
                          : undefined
                      }
                    >
                      <TransactionCard transaction={transaction} flat />
                    </View>
                  ))}
                </View>
              </Accordion>
            )
          })}
        </ScrollView>
      )}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  list: {
    maxHeight: BREAKDOWN_LIST_MAX_HEIGHT,
  },
  content: {
    gap: spacing(4),
  },
  row: {
    gap: spacing(2),
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing(2),
  },
  dot: {
    width: spacing(3),
    height: spacing(3),
    borderRadius: radius.full,
  },
  name: {
    flex: 1,
  },
  track: {
    height: BREAKDOWN_BAR_HEIGHT,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: radius.full,
  },
  transactions: {
    gap: 0,
    // Align the rows' right edge (and dividers) with the header's amount: the
    // accordion header reserves the chevron (~spacing(4)) plus its gap
    // (spacing(3)) on the right, which the body doesn't.
    paddingRight: spacing(7),
  },
  divider: {
    borderBottomWidth: 1,
  },
})
