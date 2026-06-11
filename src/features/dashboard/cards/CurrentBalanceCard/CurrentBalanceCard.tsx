import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
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
import { TransactionFormSheet, useTransactions } from "#features/transactions"
import { useI18n } from "#shared/i18n"
import { toAccountDetailsRoute } from "#shared/navigation"

import { useDashboard } from "../../data/useDashboard"
import { toAccountSnapshot } from "../../utils"
import ActiveFilters from "../ActiveFilters"
import CardFrame from "../CardFrame"

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
  const { data: account } = useAccount(config.account?.id ?? 0)
  const { updateTitle, updateConfig } = useDashboard()
  const { adjustBalance, addTransaction, transferTransaction } =
    useTransactions()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const noAccountLabel = t("dashboard.currentBalance.noAccount")

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

  const selectAccount = (accountId: number) => {
    const selected = accounts.find((item) => item.id === accountId) ?? null
    updateConfig(
      card.id,
      JSON.stringify({
        account: selected ? toAccountSnapshot(selected) : null,
      }),
    )
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
          activeFilters={
            <ActiveFilters
              labels={[noAccountLabel]}
              onPress={() => {
                setFiltersOpen(true)
              }}
            />
          }
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
        <AccountSelector
          accounts={accounts}
          selectedId={config.account?.id ?? 0}
          onSelect={selectAccount}
          allLabel={noAccountLabel}
        />
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
    </>
  )
}
