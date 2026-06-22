import { useMemo, useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import LineChart from "#design/patterns/LineChart"
import { useThemeColors } from "#design/theme"
import { AccountSelector, useAccounts } from "#features/accounts"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"
import { useI18n } from "#shared/i18n"

import { useDashboard } from "../../../data/useDashboard"
import {
  formatAmount,
  getBalanceHistoryBoundaries,
  toAccountSnapshot,
} from "../../../utils"
import ActiveFilters from "../ActiveFilters"
import CardDisplaySection from "../CardDisplaySection"
import CardFrame from "../CardFrame"
import {
  BALANCE_HISTORY_PRESET,
  type BalanceHistoryConfig,
  type BalanceHistoryPreset,
} from "../DashboardCard"
import OptionChips from "../OptionChips"

import { type BalanceHistoryCardProps } from "./types"
import { parseConfig } from "./utils"

// Plots one account's balance over a time window (last 7/30/90 days or 12
// months). The balance series is reconstructed locally from the account's
// current balance and its transactions (TransactionClient.balanceHistory) — no
// backend balance-history endpoint, unlike the web wallet.
export default function BalanceHistoryCard({
  card,
  onDelete,
}: BalanceHistoryCardProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const transactions = useManager().Transactions
  // Subscribe so the chart recomputes when transactions change.
  const { items } = useClientStore(transactions)
  const accounts = useAccounts().data ?? []
  const { updateTitle, updateConfig } = useDashboard()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const config = parseConfig(card.config)
  const account =
    accounts.find((item) => item.id === config.account?.id) ?? null
  const symbol = account?.currency.symbol ?? ""

  const boundaries = useMemo(
    () => getBalanceHistoryBoundaries(config.preset),
    [config.preset],
  )
  const points = useMemo(
    () => (account ? transactions.balanceHistory(account.id, boundaries) : []),
    // `items` isn't read here (the client owns the series) but must re-trigger
    // the memo when transactions change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions, account, boundaries, items],
  )

  const values = points.map((point) => point.balance)
  // "YYYY/MM/DD" → "MM/DD" for the chart's X axis.
  const labels = points.map((point) => point.date.slice(5))
  const latest = values.length > 0 ? values[values.length - 1] : 0

  const presetOptions = [
    {
      value: BALANCE_HISTORY_PRESET.LAST_7_DAYS,
      label: t("dashboard.preset.last7Days"),
    },
    {
      value: BALANCE_HISTORY_PRESET.LAST_30_DAYS,
      label: t("dashboard.preset.last30Days"),
    },
    {
      value: BALANCE_HISTORY_PRESET.LAST_90_DAYS,
      label: t("dashboard.preset.last90Days"),
    },
    {
      value: BALANCE_HISTORY_PRESET.LAST_12_MONTHS,
      label: t("dashboard.preset.last12Months"),
    },
  ]

  const noAccountLabel = t("dashboard.balanceHistory.noAccount")
  const presetLabel =
    presetOptions.find((option) => option.value === config.preset)?.label ??
    t("dashboard.preset.last30Days")
  const accountLabel = config.account?.name ?? noAccountLabel

  const update = (next: BalanceHistoryConfig) => {
    updateConfig(card.id, JSON.stringify(next))
  }

  return (
    <>
      <CardFrame
        title={card.title}
        placeholder={t("dashboard.balanceHistory.placeholder")}
        onRename={(value) => {
          updateTitle(card.id, value)
        }}
        onOpenFilters={() => {
          setFiltersOpen(true)
        }}
        onDelete={onDelete}
        filterBadgeCount={
          config.showFiltersAsBadge
            ? 1 + (config.account !== null ? 1 : 0)
            : undefined
        }
        activeFilters={
          !config.showFiltersAsBadge ? (
            <ActiveFilters
              items={[{ label: accountLabel }, { label: presetLabel }]}
              onPress={() => {
                setFiltersOpen(true)
              }}
            />
          ) : undefined
        }
      >
        {account === null ? (
          <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY}>
            {noAccountLabel}
          </Typography>
        ) : values.length < 2 ? (
          <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
            {t("dashboard.balanceHistory.empty")}
          </Typography>
        ) : (
          <View style={styles.content}>
            <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY}>
              {formatAmount(latest, symbol)}
            </Typography>
            <LineChart values={values} labels={labels} color={colors.primary} />
          </View>
        )}
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
            allLabel={noAccountLabel}
          />
        </View>

        <View style={styles.section}>
          <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
            {t("dashboard.filter.preset")}
          </Typography>
          <OptionChips<BalanceHistoryPreset>
            options={presetOptions}
            value={config.preset}
            onSelect={(preset) => {
              update({ ...config, preset })
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
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: spacing(3),
  },
  section: {
    gap: spacing(2),
  },
})
