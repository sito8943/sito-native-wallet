import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Chip from "#design/elements/Chip"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Accordion from "#design/patterns/Accordion"
import { useI18n } from "#shared/i18n"

import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
} from "../TransactionsPreferences"

import { SORT_OPTIONS, TYPE_OPTIONS } from "./constants"
import { type TransactionsFiltersProps } from "./types"

export default function TransactionsFilters({
  preferences,
  setSortOrder,
  setTypeFilter,
}: TransactionsFiltersProps): ReactElement {
  const { t } = useI18n()
  const activeCount = countActiveFilters(preferences)

  return (
    <Card>
      <Accordion
        header={
          <View style={styles.headerContent}>
            <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
              {t("transactions.filters.title")}
            </Typography>
            {activeCount > 0 && (
              <Typography
                variant={TYPOGRAPHY_VARIANT.CAPTION}
                tone={TYPOGRAPHY_TONE.MUTED}
              >
                {t("transactions.filters.activeCount", { count: activeCount })}
              </Typography>
            )}
          </View>
        }
      >
        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("transactions.filters.type")}
          </Typography>
          <View style={styles.options}>
            {TYPE_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                active={preferences.typeFilter === option.value}
                label={t(option.labelKey)}
                onPress={() => setTypeFilter(option.value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("transactions.filters.sort")}
          </Typography>
          <View style={styles.options}>
            {SORT_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                active={preferences.sortOrder === option.value}
                label={t(option.labelKey)}
                onPress={() => setSortOrder(option.value)}
              />
            ))}
          </View>
        </View>
      </Accordion>
    </Card>
  )
}

const countActiveFilters = (
  preferences: TransactionsFiltersProps["preferences"],
): number => {
  let count = 0
  if (preferences.typeFilter !== TRANSACTION_TYPE_FILTER.ALL) count++
  if (preferences.sortOrder !== TRANSACTION_SORT_ORDER.NEWEST) count++
  if (preferences.accountId !== 0) count++
  return count
}

const styles = StyleSheet.create({
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(3),
  },
  section: {
    gap: spacing(2),
    marginTop: spacing(4),
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
})
