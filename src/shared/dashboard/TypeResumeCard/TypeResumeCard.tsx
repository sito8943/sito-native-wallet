import { useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { AccountSelector, useAccounts } from "#shared/accounts"
import {
  TRANSACTION_TYPE,
  type TransactionType,
} from "#shared/categories/TransactionCategory"
import { useI18n } from "#shared/i18n"
import { useTransactions } from "#shared/transactions"

import ActiveFilters from "../ActiveFilters"
import CardFrame from "../CardFrame"
import {
  DEFAULT_TYPE_RESUME_CONFIG,
  TYPE_RESUME_TIME,
  type TypeResumeConfig,
  type TypeResumeTime,
} from "../DashboardCard"
import OptionChips from "../OptionChips"
import { useDashboard } from "../useDashboard"
import { formatAmount, getTimeRange, sumTransactions } from "../utils"

import { type TypeResumeCardProps } from "./types"

const parseConfig = (raw: string | null): TypeResumeConfig => {
  try {
    return raw
      ? (JSON.parse(raw) as TypeResumeConfig)
      : DEFAULT_TYPE_RESUME_CONFIG
  } catch {
    return DEFAULT_TYPE_RESUME_CONFIG
  }
}

// Total for a transaction type over a time window (week/month/year/all),
// optionally scoped to one account.
export default function TypeResumeCard({
  card,
  onDelete,
}: TypeResumeCardProps): ReactElement {
  const { t } = useI18n()
  const accounts = useAccounts().data ?? []
  const { data: transactions } = useTransactions()
  const { updateTitle, updateConfig } = useDashboard()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const config = parseConfig(card.config)
  const range = getTimeRange(config.time)

  const total = sumTransactions(transactions, {
    type: config.type,
    accountId: config.accountId,
    start: range.start,
    end: range.end,
  })

  const account =
    accounts.find((item) => item.id === config.accountId) ?? accounts[0] ?? null
  const symbol = account?.currency.symbol ?? ""

  const typeOptions = [
    { value: TRANSACTION_TYPE.INCOME, label: t("form.category.type.income") },
    { value: TRANSACTION_TYPE.EXPENSE, label: t("form.category.type.expense") },
  ]
  const timeOptions = [
    { value: TYPE_RESUME_TIME.WEEK, label: t("dashboard.time.week") },
    { value: TYPE_RESUME_TIME.MONTH, label: t("dashboard.time.month") },
    { value: TYPE_RESUME_TIME.YEAR, label: t("dashboard.time.year") },
    { value: TYPE_RESUME_TIME.ALL, label: t("dashboard.time.all") },
  ]

  const typeLabel =
    config.type === TRANSACTION_TYPE.INCOME
      ? t("form.category.type.income")
      : t("form.category.type.expense")
  const timeLabel =
    timeOptions.find((option) => option.value === config.time)?.label ??
    t("dashboard.time.month")
  const accountLabel = config.accountId
    ? (accounts.find((item) => item.id === config.accountId)?.name ??
      t("dashboard.filter.allAccounts"))
    : t("dashboard.filter.allAccounts")

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
        <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY}>
          {formatAmount(total, symbol)}
        </Typography>
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
            selectedId={config.accountId ?? 0}
            onSelect={(accountId) => {
              update({
                ...config,
                accountId: accountId === 0 ? undefined : accountId,
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
})
