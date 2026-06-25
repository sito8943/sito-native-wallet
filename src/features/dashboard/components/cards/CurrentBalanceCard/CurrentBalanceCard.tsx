import { useRouter } from "expo-router"
import { useEffect, useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { type Action, ACTION_ID } from "#design/interactions"
import BottomSheet from "#design/patterns/BottomSheet"
import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountTransferSheet,
  AccountSelector,
  AccountVisual,
  useAccount,
  useAccounts,
  useAdjustBalanceSheet,
  useTransferSheet,
} from "#features/accounts"
import {
  type FilterTransactionDto,
  TransactionFormSheet,
  useTransactions,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"
import { toAccountDetailsRoute } from "#shared/navigation"

import { useDashboard } from "../../../data/useDashboard"
import { toAccountSnapshot } from "../../../utils"
import CardDisplaySection from "../CardDisplaySection"
import CardFrame from "../CardFrame"
import RecentTransactionsSheet from "../RecentTransactionsSheet"

import { type CurrentBalanceCardProps } from "./types"
import { parseConfig } from "./utils"

// Shows one account's balance. Once an account is selected it renders the real
// account visual (the shared AccountVisual) so it reads like the account card,
// while keeping the dashboard card's controls — filters (config) and delete —
// as corner actions. With no account it falls back to the framed prompt.
export default function CurrentBalanceCard({
  card,
  onDelete,
}: CurrentBalanceCardProps): ReactElement {
  const config = parseConfig(card.config)
  const { t } = useI18n()
  const router = useRouter()
  // accounts feeds the selector; the displayed account is resolved by the
  // client (getById), not joined from the list in the UI.
  const accounts = useAccounts().data ?? []
  // With a single account there's no real choice to make, so default the card to
  // it. Derived for immediate display, then persisted by the effect below so it
  // sticks (and survives adding more accounts later).
  const onlyAccount = accounts.length === 1 ? accounts[0] : undefined
  const effectiveAccountId = config.account?.id ?? onlyAccount?.id ?? 0
  const { data: account } = useAccount(effectiveAccountId)
  const { updateTitle, updateConfig } = useDashboard()
  const { adjustBalance, addTransaction, transferTransaction } =
    useTransactions()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [recentOpen, setRecentOpen] = useState(false)

  const noAccountLabel = t("dashboard.currentBalance.noAccount")

  // Recent transactions are scoped to the shown account (no type/date filter) —
  // the same FilterTransactionDto shape the RecentTransactionsSheet expects.
  const recentFilters: FilterTransactionDto = { accountId: account?.id }

  // The client owns the adjustment logic; the card only bridges the account id.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (target, newBalance, description) => {
      adjustBalance(target.id, newBalance, description)
    },
  })
  const { action: transferAction, sheetProps: transferSheetProps } =
    useTransferSheet({
      onTransfer: (from, toAccountId, amount, date, description) => {
        transferTransaction({
          fromAccountId: from.id,
          toAccountId,
          amount,
          date,
          description,
        })
      },
    })

  const update = (next: typeof config) => {
    updateConfig(card.id, JSON.stringify(next))
  }

  // Persist the single-account default (not just derive it) so it reads like a
  // deliberate selection and survives adding more accounts later. Idempotent —
  // once an account is set this no-ops, and it won't override an explicit pick.
  useEffect(() => {
    if (config.account == null && onlyAccount !== undefined) {
      update({ ...config, account: toAccountSnapshot(onlyAccount) })
    }
    // Keyed on the single account's id + whether one is configured; `update`
    // and `config` are stable enough for this guarded one-shot write.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyAccount?.id, config.account?.id])

  const selectAccount = (accountId: number) => {
    const selected = accounts.find((item) => item.id === accountId) ?? null
    update({
      ...config,
      account: selected ? toAccountSnapshot(selected) : null,
    })
  }

  const hasTransferTarget = (origin: Account): boolean =>
    accounts.some(
      (candidate) =>
        candidate.id !== origin.id &&
        candidate.currency.id === origin.currency.id,
    )

  // Corner actions on the account visual. Keep the primary money actions
  // visible; card-management actions stay in the overflow to avoid a crowded
  // header on the dashboard card.
  const cardActions = (acc: Account): Array<Action<Account>> => [
    {
      id: ACTION_ID.ADD_TRANSACTION,
      sticky: true,
      icon: APP_ICONS.add,
      accessibilityLabel: t("transactions.add"),
      onPress: () => {
        setAddOpen(true)
      },
    },
    {
      ...transferAction(acc),
      sticky: true,
      hidden: !hasTransferTarget(acc),
    },
    { ...adjustAction(acc), sticky: true },
    {
      id: ACTION_ID.RECENT,
      sticky: true,
      icon: APP_ICONS.recent,
      accessibilityLabel: t("dashboard.recentTransactions.action"),
      onPress: () => {
        setRecentOpen(true)
      },
    },
    {
      id: ACTION_ID.FILTERS,
      icon: APP_ICONS.filter,
      accessibilityLabel: t("dashboard.card.filters"),
      onPress: () => {
        setFiltersOpen(true)
      },
    },
    {
      id: ACTION_ID.DELETE,
      icon: APP_ICONS.delete,
      accessibilityLabel: t("dashboard.card.delete.action"),
      onPress: () => {
        onDelete()
      },
    },
  ]

  return (
    <>
      {account ? (
        <AccountVisual
          account={account}
          actions={cardActions(account)}
          onPress={() => {
            // Tapping the card opens the account; the filter action still opens
            // the config sheet to change which account it tracks.
            router.push(toAccountDetailsRoute(account.id))
          }}
        />
      ) : (
        <CardFrame
          title={card.title}
          placeholder={t("dashboard.currentBalance.placeholder")}
          onRename={(value) => {
            updateTitle(card.id, value)
          }}
          onOpenFilters={() => {
            setFiltersOpen(true)
          }}
          onDelete={onDelete}
        >
          <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY}>
            {noAccountLabel}
          </Typography>
        </CardFrame>
      )}

      <BottomSheet
        open={filtersOpen}
        title={t("dashboard.filter.account")}
        onClose={() => {
          setFiltersOpen(false)
        }}
      >
        <View style={styles.sheet}>
          <AccountSelector
            accounts={accounts}
            selectedId={effectiveAccountId}
            onSelect={selectAccount}
            allLabel={noAccountLabel}
          />
          <CardDisplaySection
            showFiltersAsBadge={config.showFiltersAsBadge}
            onToggleFiltersBadge={() => {
              update({
                ...config,
                showFiltersAsBadge: !config.showFiltersAsBadge,
              })
            }}
          />
        </View>
      </BottomSheet>

      <AccountAdjustBalanceSheet {...sheetProps} />
      <AccountTransferSheet {...transferSheetProps} />

      <TransactionFormSheet
        open={addOpen}
        defaultAccountId={account?.id}
        onClose={() => {
          setAddOpen(false)
        }}
        onSubmit={addTransaction}
      />

      {/* Recent transactions for this account — the web wallet's dialog, reused
          from TypeResumeCard. Scoped to the selected account, newest first. */}
      <RecentTransactionsSheet
        open={recentOpen}
        title={t("dashboard.recentTransactions.action")}
        filters={recentFilters}
        onClose={() => {
          setRecentOpen(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  sheet: {
    gap: spacing(4),
  },
})
