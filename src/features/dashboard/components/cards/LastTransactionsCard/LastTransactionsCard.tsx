import { useState, type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Autocomplete from "#design/patterns/Autocomplete"
import BottomSheet from "#design/patterns/BottomSheet"
import { useThemeColors } from "#design/theme"
import { AccountSelector, useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import {
  type FilterTransactionDto,
  TransactionCard,
  TransactionFormSheet,
  useTransactions,
  useTransactionsList,
} from "#features/transactions"
import { SORT_ORDER } from "#shared/data"
import { useI18n } from "#shared/i18n"

import { useDashboard } from "../../../data/useDashboard"
import { toAccountSnapshot } from "../../../utils"
import ActiveFilters from "../ActiveFilters"
import CardDisplaySection from "../CardDisplaySection"
import CardFrame from "../CardFrame"
import {
  type LastTransactionsConfig,
  LAST_TRANSACTIONS_LIMITS,
} from "../DashboardCard"
import OptionChips from "../OptionChips"
import RecentTransactionsSheet from "../RecentTransactionsSheet"

import { type LastTransactionsCardProps } from "./types"
import { parseConfig } from "./utils"

// Lists the newest N transactions matching the card's filters (account +
// categories, both optional → all). The last visible row is dimmed to hint
// there's more behind it; tapping the list opens the full recent sheet with the
// same filters, and the add action pre-fills the unambiguous parts of the
// filter (account always, category only when exactly one is selected).
export default function LastTransactionsCard({
  card,
  onDelete,
}: LastTransactionsCardProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const accounts = useAccounts().data ?? []
  const { data: categories } = useCategories()
  const { updateTitle, updateConfig } = useDashboard()
  const { addTransaction } = useTransactions()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [recentOpen, setRecentOpen] = useState(false)

  const config = parseConfig(card.config)

  const filters: FilterTransactionDto = {
    accountId: config.account?.id,
    category: config.categoryIds.length > 0 ? config.categoryIds : undefined,
  }

  const { result } = useTransactionsList({
    filters,
    query: {
      sortingBy: "date",
      sortingOrder: SORT_ORDER.DESC,
      pageSize: config.limit,
    },
  })
  const items = result.items.slice(0, config.limit)

  // Non-system categories only, matching the transaction form's pickable set.
  const categoryOptions = categories
    .filter((category) => category.system !== true)
    .map((category) => ({ id: category.id, label: category.name }))

  const limitOptions = LAST_TRANSACTIONS_LIMITS.map((value) => ({
    value,
    label: `${value}`,
  }))

  const allAccountsLabel = t("dashboard.filter.allAccounts")
  const allCategoriesLabel = t("dashboard.lastTransactions.allCategories")
  const accountLabel = config.account?.name ?? allAccountsLabel
  const categoriesLabel =
    config.categoryIds.length === 0
      ? allCategoriesLabel
      : config.categoryIds
          .map((id) => categories.find((category) => category.id === id)?.name)
          .filter((name): name is string => Boolean(name))
          .join(", ")

  // Pre-fill only the unambiguous: account when set, category only when exactly
  // one is selected (an "all"/multi filter leaves the form's category empty).
  const defaultCategoryIds =
    config.categoryIds.length === 1 ? config.categoryIds : []

  const update = (next: LastTransactionsConfig) => {
    updateConfig(card.id, JSON.stringify(next))
  }

  return (
    <>
      <CardFrame
        title={card.title}
        placeholder={t("dashboard.lastTransactions.placeholder")}
        onRename={(value) => {
          updateTitle(card.id, value)
        }}
        onOpenFilters={() => {
          setFiltersOpen(true)
        }}
        onDelete={onDelete}
        filterBadgeCount={
          config.showFiltersAsBadge
            ? 1 +
              (config.account !== null ? 1 : 0) +
              (config.categoryIds.length > 0 ? 1 : 0)
            : undefined
        }
        activeFilters={
          !config.showFiltersAsBadge ? (
            <ActiveFilters
              items={[
                {
                  label: t("dashboard.lastTransactions.limitChip", {
                    count: config.limit,
                  }),
                },
                { label: accountLabel },
                { label: categoriesLabel },
              ]}
              onPress={() => {
                setFiltersOpen(true)
              }}
            />
          ) : undefined
        }
      >
        <View style={styles.content}>
          {items.length === 0 ? (
            <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
              {t("transactions.empty.default")}
            </Typography>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("dashboard.recentTransactions.action")}
              onPress={() => {
                setRecentOpen(true)
              }}
            >
              {items.map((transaction, index) => {
                const isLast = index === items.length - 1
                return (
                  <View
                    key={transaction.id}
                    style={[
                      !isLast && [
                        styles.divider,
                        { borderBottomColor: colors.border },
                      ],
                      isLast && styles.faded,
                    ]}
                  >
                    <TransactionCard transaction={transaction} flat />
                  </View>
                )
              })}
            </Pressable>
          )}

          <View style={styles.actions}>
            <IconButton
              accessibilityLabel={t("transactions.add")}
              icon={APP_ICONS.add}
              variant={ICON_BUTTON_VARIANT.TEXT}
              size={ICON_BUTTON_SIZE.MD}
              iconSize={ICON_BUTTON_SIZE.LG}
              iconColor={colors.primary}
              onPress={() => {
                setAddOpen(true)
              }}
            />
            <IconButton
              accessibilityLabel={t("dashboard.recentTransactions.action")}
              icon={APP_ICONS.recent}
              variant={ICON_BUTTON_VARIANT.TEXT}
              size={ICON_BUTTON_SIZE.MD}
              iconSize={ICON_BUTTON_SIZE.LG}
              iconColor={colors.textMuted}
              onPress={() => {
                setRecentOpen(true)
              }}
            />
          </View>
        </View>
      </CardFrame>

      <BottomSheet
        open={filtersOpen}
        title={t("dashboard.card.filters")}
        onClose={() => {
          setFiltersOpen(false)
        }}
      >
        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.lastTransactions.limitLabel")}
          </Typography>
          <OptionChips<number>
            options={limitOptions}
            value={config.limit}
            onSelect={(limit) => {
              update({ ...config, limit })
            }}
          />
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.filter.account")}
          </Typography>
          <AccountSelector
            accounts={accounts}
            selectedId={config.account?.id ?? 0}
            onSelect={(accountId) => {
              const selected =
                accounts.find((item) => item.id === accountId) ?? null
              update({
                ...config,
                account: selected ? toAccountSnapshot(selected) : null,
              })
            }}
            allLabel={allAccountsLabel}
          />
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.lastTransactions.categories")}
          </Typography>
          <Autocomplete
            multiple
            placeholder={t("dashboard.lastTransactions.categories.placeholder")}
            options={categoryOptions}
            value={config.categoryIds}
            onChange={(ids) => {
              update({ ...config, categoryIds: ids })
            }}
          />
        </View>

        <CardDisplaySection
          showFiltersAsBadge={config.showFiltersAsBadge}
          onToggleFiltersBadge={() => {
            update({
              ...config,
              showFiltersAsBadge: !config.showFiltersAsBadge,
            })
          }}
        />
      </BottomSheet>

      <TransactionFormSheet
        open={addOpen}
        defaultAccountId={config.account?.id}
        defaultCategoryIds={defaultCategoryIds}
        onClose={() => {
          setAddOpen(false)
        }}
        onSubmit={addTransaction}
      />

      <RecentTransactionsSheet
        open={recentOpen}
        title={t("dashboard.recentTransactions.action")}
        filters={filters}
        onClose={() => {
          setRecentOpen(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: spacing(2),
  },
  section: {
    gap: spacing(2),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing(1),
  },
  divider: {
    borderBottomWidth: 1,
  },
  faded: {
    opacity: 0.5,
  },
})
