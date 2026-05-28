import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import IconButton from "#design/elements/IconButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { SORT_OPTIONS, TYPE_OPTIONS } from "./constants"
import FilterChip from "./FilterChip"
import { type TransactionsFiltersProps } from "./types"

export default function TransactionsFilters({
  accounts,
  preferences,
  resetPreferences,
  setAccountId,
  setSortOrder,
  setTypeFilter,
}: TransactionsFiltersProps): ReactElement {
  return (
    <Card>
      <View style={styles.header}>
        <Typography variant="title">Filters</Typography>
        <IconButton
          accessibilityLabel="Reset filters"
          icon="rotate-left"
          onPress={resetPreferences}
          variant="text"
        />
      </View>

      <View style={styles.section}>
        <Typography variant="label">Type</Typography>
        <View style={styles.options}>
          {TYPE_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              isActive={preferences.typeFilter === option.value}
              label={option.label}
              onPress={() => setTypeFilter(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="label">Sort</Typography>
        <View style={styles.options}>
          {SORT_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              isActive={preferences.sortOrder === option.value}
              label={option.label}
              onPress={() => setSortOrder(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="label">Account</Typography>
        <View style={styles.options}>
          <FilterChip
            isActive={preferences.accountId === null}
            label="All accounts"
            onPress={() => setAccountId(null)}
          />

          {accounts.map((account) => (
            <FilterChip
              key={account.id}
              isActive={preferences.accountId === account.id}
              label={account.name}
              onPress={() => setAccountId(account.id)}
            />
          ))}
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
})
