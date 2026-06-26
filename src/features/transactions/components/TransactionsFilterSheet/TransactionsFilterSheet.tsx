import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { useI18n } from "#shared/i18n"

import { SORT_OPTIONS, TYPE_OPTIONS } from "./constants"
import { type TransactionsFilterSheetProps } from "./types"

// Type + sort filters in a bottom sheet, opened from the transactions screen's
// filter icon (the account carousel's trailing action).
export default function TransactionsFilterSheet({
  open,
  onClose,
  preferences,
  setSortOrder,
  setTypeFilter,
}: TransactionsFilterSheetProps): ReactElement {
  const { t } = useI18n()

  return (
    <BottomSheet
      open={open}
      title={t("transactions.filters.title")}
      onClose={onClose}
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
              onPress={() => {
                setTypeFilter(option.value)
              }}
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
              onPress={() => {
                setSortOrder(option.value)
              }}
            />
          ))}
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  section: {
    gap: spacing(2),
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
})
