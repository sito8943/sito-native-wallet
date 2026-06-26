import { useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
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
  TRANSACTION_TYPE,
  type TransactionType,
} from "#features/categories/TransactionCategory"
import {
  type FilterTransactionDto,
  TransactionFormSheet,
  useTransactions,
  useTransactionsTotal,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"

import { useDashboard } from "../../../data/useDashboard"
import {
  getOppositeType,
  getTimeRange,
  toAccountSnapshot,
} from "../../../utils"
import ActiveFilters from "../ActiveFilters"
import CardDisplaySection from "../CardDisplaySection"
import CardFrame from "../CardFrame"
import CategoryBreakdownSheet from "../CategoryBreakdownSheet"
import {
  TYPE_RESUME_TIME,
  type TypeResumeConfig,
  type TypeResumeTime,
} from "../DashboardCard"
import OptionChips from "../OptionChips"
import RecentTransactionsSheet from "../RecentTransactionsSheet"
import TypeTotal from "../TypeTotal"

import { type TypeResumeCardProps } from "./types"
import { parseConfig } from "./utils"

// Total for a transaction type over a time window (day/week/month/year),
// optionally scoped to one account.
export default function TypeResumeCard({
  card,
  onDelete,
}: TypeResumeCardProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const accounts = useAccounts().data ?? []
  const { data: categories } = useCategories()
  const { updateTitle, updateConfig } = useDashboard()
  const { addTransaction } = useTransactions()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [recentOpen, setRecentOpen] = useState(false)
  const [breakdownOpen, setBreakdownOpen] = useState(false)

  const config = parseConfig(card.config)
  const range = getTimeRange(config.time)
  const date =
    range.start !== undefined && range.end !== undefined
      ? { start: range.start, end: range.end }
      : undefined
  const excludeCategory = config.excludedCategoryIds
  const filters: FilterTransactionDto = {
    type: config.type,
    accountId: config.account?.id,
    date,
    excludeCategory,
    manualOrWithAnyManualCategory: true,
  }

  // The client owns the aggregation; the card just describes what it wants.
  const total = useTransactionsTotal(filters)

  // Opposite-type total (always computed so the hook order stays stable; only
  // rendered when showOppositeType is on).
  const oppositeType = getOppositeType(config.type)
  const oppositeExcludeCategory = config.oppositeExcludedCategoryIds
  const oppositeFilters: FilterTransactionDto = {
    type: oppositeType,
    accountId: config.account?.id,
    date,
    excludeCategory: oppositeExcludeCategory,
    manualOrWithAnyManualCategory: true,
  }
  const oppositeTotal = useTransactionsTotal(oppositeFilters)

  // Currency follows the scoped account, else the first account.
  const account =
    accounts.find((item) => item.id === config.account?.id) ??
    accounts[0] ??
    null
  const symbol = account?.currency.symbol ?? ""

  const typeOptions = [
    { value: TRANSACTION_TYPE.INCOME, label: t("form.category.type.income") },
    { value: TRANSACTION_TYPE.EXPENSE, label: t("form.category.type.expense") },
  ]
  const timeOptions = [
    {
      value: TYPE_RESUME_TIME.CURRENT_DAY,
      label: t("dashboard.time.currentDay"),
    },
    {
      value: TYPE_RESUME_TIME.CURRENT_WEEK,
      label: t("dashboard.time.currentWeek"),
    },
    {
      value: TYPE_RESUME_TIME.CURRENT_MONTH,
      label: t("dashboard.time.currentMonth"),
    },
    {
      value: TYPE_RESUME_TIME.CURRENT_YEAR,
      label: t("dashboard.time.currentYear"),
    },
  ]

  const typeLabel =
    config.type === TRANSACTION_TYPE.INCOME
      ? t("form.category.type.income")
      : t("form.category.type.expense")
  const timeLabel =
    timeOptions.find((option) => option.value === config.time)?.label ??
    t("dashboard.time.currentMonth")
  const accountLabel = config.account?.name ?? t("dashboard.filter.allAccounts")

  // System categories (transfers, adjustments) aren't user-pickable, matching
  // the transaction form's options; categories are typed, so each exclude list
  // only offers categories of the type it filters (like the web wallet).
  const categoryOptionsFor = (forType: TransactionType) =>
    categories
      .filter(
        (category) => category.system !== true && category.type === forType,
      )
      .map((category) => ({ id: category.id, label: category.name }))
  const categoryOptions = categoryOptionsFor(config.type)
  const oppositeCategoryOptions = categoryOptionsFor(oppositeType)

  // Excluded categories are stored as ids (web parity); resolve their names from
  // the live categories store for the active-filter chip label.
  const categoryNames = (ids: number[]): string =>
    ids
      .map((id) => categories.find((category) => category.id === id)?.name)
      .filter((name): name is string => name !== undefined)
      .join(", ")

  const excludeLabel =
    config.excludedCategoryIds.length > 0
      ? t("dashboard.filter.excluding", {
          categories: categoryNames(config.excludedCategoryIds),
        })
      : null
  const oppositeExcludeLabel =
    config.showOppositeType && config.oppositeExcludedCategoryIds.length > 0
      ? t("dashboard.filter.excluding", {
          categories: categoryNames(config.oppositeExcludedCategoryIds),
        })
      : null

  const tone =
    config.type === TRANSACTION_TYPE.INCOME ? colors.positive : colors.negative
  const oppositeTone =
    oppositeType === TRANSACTION_TYPE.INCOME ? colors.positive : colors.negative

  const update = (next: TypeResumeConfig) => {
    updateConfig(card.id, JSON.stringify(next))
  }

  // Active-filter chips. Type and time are always shown; account and the two
  // exclude lists also get a "×" to clear just that filter (web parity).
  const filterItems = [
    { label: typeLabel },
    { label: timeLabel },
    ...(config.account
      ? [
          {
            label: accountLabel,
            onClear: () => update({ ...config, account: null }),
          },
        ]
      : []),
    ...(excludeLabel
      ? [
          {
            label: excludeLabel,
            onClear: () => update({ ...config, excludedCategoryIds: [] }),
          },
        ]
      : []),
    ...(oppositeExcludeLabel
      ? [
          {
            label: oppositeExcludeLabel,
            onClear: () =>
              update({ ...config, oppositeExcludedCategoryIds: [] }),
          },
        ]
      : []),
  ]

  // Changing the type invalidates the excluded categories (they're typed), so
  // drop the ones that no longer match either list's type — mirrors the web
  // wallet's re-validation on type change.
  const changeType = (type: TransactionType) => {
    const opposite = getOppositeType(type)
    const idsOfType = (ids: number[], forType: TransactionType): number[] =>
      ids.filter(
        (id) =>
          categories.find((category) => category.id === id)?.type === forType,
      )
    update({
      ...config,
      type,
      excludedCategoryIds: idsOfType(config.excludedCategoryIds, type),
      oppositeExcludedCategoryIds: idsOfType(
        config.oppositeExcludedCategoryIds,
        opposite,
      ),
    })
  }

  // Turning the opposite total off clears its excluded categories (web parity).
  const toggleOppositeType = () => {
    const next = !config.showOppositeType
    update({
      ...config,
      showOppositeType: next,
      oppositeExcludedCategoryIds: next
        ? config.oppositeExcludedCategoryIds
        : [],
    })
  }

  return (
    <>
      <CardFrame
        title={card.title}
        placeholder={t("dashboard.typeResume.placeholder")}
        onRename={(value) => {
          updateTitle(card.id, value)
        }}
        onOpenFilters={() => {
          setFiltersOpen(true)
        }}
        onDelete={onDelete}
        filterBadgeCount={
          config.showFiltersAsBadge ? filterItems.length : undefined
        }
        activeFilters={
          !config.showFiltersAsBadge ? (
            <ActiveFilters
              items={filterItems}
              onPress={() => {
                setFiltersOpen(true)
              }}
            />
          ) : undefined
        }
      >
        <View style={styles.body}>
          <View style={styles.totals}>
            {config.showOppositeType ? (
              <TypeTotal
                type={oppositeType}
                amount={oppositeTotal}
                symbol={symbol}
                tone={oppositeTone}
                variant={TYPOGRAPHY_VARIANT.TITLE}
              />
            ) : null}
            <TypeTotal
              type={config.type}
              amount={total}
              symbol={symbol}
              tone={tone}
            />
          </View>

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
              disabled={date === undefined}
              onPress={() => {
                setRecentOpen(true)
              }}
            />
            <IconButton
              accessibilityLabel={t("dashboard.categoryBreakdown.action")}
              icon={APP_ICONS.list}
              variant={ICON_BUTTON_VARIANT.TEXT}
              iconSize={ICON_BUTTON_SIZE.LG}
              size={ICON_BUTTON_SIZE.MD}
              iconColor={colors.textMuted}
              disabled={total === 0}
              onPress={() => {
                setBreakdownOpen(true)
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
            {t("dashboard.filter.type")}
          </Typography>
          <OptionChips<TransactionType>
            options={typeOptions}
            value={config.type}
            onSelect={changeType}
          />
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.filter.time")}
          </Typography>
          <OptionChips<TypeResumeTime>
            options={timeOptions}
            value={config.time}
            onSelect={(time) => {
              update({ ...config, time })
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
            allLabel={t("dashboard.filter.allAccounts")}
          />
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.filter.excludeCategories")}
          </Typography>
          <Autocomplete
            multiple
            placeholder={t("dashboard.filter.excludeCategories.placeholder")}
            options={categoryOptions}
            value={excludeCategory}
            onChange={(ids) => {
              update({ ...config, excludedCategoryIds: ids })
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
        >
          <Chip
            active={config.showOppositeType}
            label={t("dashboard.filter.showOpposite")}
            onPress={toggleOppositeType}
          />
        </CardDisplaySection>

        {config.showOppositeType ? (
          <View style={styles.section}>
            <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
              {t("dashboard.filter.excludeOppositeCategories")}
            </Typography>
            <Autocomplete
              multiple
              placeholder={t("dashboard.filter.excludeCategories.placeholder")}
              options={oppositeCategoryOptions}
              value={oppositeExcludeCategory}
              onChange={(ids) => {
                update({ ...config, oppositeExcludedCategoryIds: ids })
              }}
            />
          </View>
        ) : null}
      </BottomSheet>

      <TransactionFormSheet
        open={addOpen}
        defaultAccountId={account?.id}
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

      <CategoryBreakdownSheet
        open={breakdownOpen}
        title={t("dashboard.categoryBreakdown.action")}
        symbol={symbol}
        filters={filters}
        onClose={() => {
          setBreakdownOpen(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  section: {
    gap: spacing(2),
  },
  // Totals on the left, actions on the right, both aligned to the bottom.
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing(2),
  },
  totals: {
    gap: spacing(2),
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing(1),
  },
})
