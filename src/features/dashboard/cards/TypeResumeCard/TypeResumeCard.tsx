import { useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { useThemeColors } from "#design/theme"
import { AccountSelector, useAccounts } from "#features/accounts"
import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "#features/categories/TransactionCategory"
import {
  TransactionTypeBadge,
  useTransactionsTotal,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"

import { useDashboard } from "../../data/useDashboard"
import { formatAmount, getTimeRange, toAccountSnapshot } from "../../utils"
import ActiveFilters from "../ActiveFilters"
import CardFrame from "../CardFrame"
import {
  TYPE_RESUME_TIME,
  type TypeResumeConfig,
  type TypeResumeTime,
} from "../DashboardCard"
import OptionChips from "../OptionChips"

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
  const { updateTitle, updateConfig } = useDashboard()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const config = parseConfig(card.config)
  const range = getTimeRange(config.time)
  const date =
    range.start !== undefined && range.end !== undefined
      ? { start: range.start, end: range.end }
      : undefined

  // The client owns the aggregation; the card just describes what it wants.
  const total = useTransactionsTotal({
    type: config.type,
    accountId: config.account?.id,
    date,
  })

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

  const tone =
    config.type === TRANSACTION_TYPE.INCOME ? colors.positive : colors.negative

  const update = (next: TypeResumeConfig) => {
    updateConfig(card.id, JSON.stringify(next))
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
        activeFilters={
          <ActiveFilters
            labels={[typeLabel, timeLabel, accountLabel]}
            onPress={() => {
              setFiltersOpen(true)
            }}
          />
        }
      >
        <View style={styles.value}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.DISPLAY}
            style={{ color: tone }}
          >
            {formatAmount(total, symbol)}
          </Typography>
          <View style={styles.badge}>
            <TransactionTypeBadge type={config.type} showText={false} />
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
            onSelect={(type) => {
              update({ ...config, type })
            }}
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
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  section: {
    gap: spacing(2),
  },
  value: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
})
