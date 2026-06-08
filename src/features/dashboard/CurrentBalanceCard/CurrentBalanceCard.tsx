import { useState, type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import { type Action, ACTION_ID } from "#design/interactions"
import BottomSheet from "#design/patterns/BottomSheet"
import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountSelector,
  AccountVisual,
  useAccounts,
  useAdjustBalanceSheet,
} from "#features/accounts"
import { TransactionFormSheet, useTransactions } from "#features/transactions"
import { useI18n } from "#shared/i18n"

import ActiveFilters from "../ActiveFilters"
import CardFrame from "../CardFrame"
import { useDashboard } from "../useDashboard"
import { toAccountSnapshot } from "../utils"

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
  const { t } = useI18n()
  const accounts = useAccounts().data ?? []
  const { updateTitle, updateConfig } = useDashboard()
  const { adjustBalance, addTransaction } = useTransactions()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const config = parseConfig(card.config)
  const account =
    accounts.find((item) => item.id === config.account?.id) ?? null

  const noAccountLabel = t("dashboard.currentBalance.noAccount")

  // The client owns the adjustment logic; the card only bridges the account id.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (target, newBalance, description) => {
      adjustBalance(target.id, newBalance, description)
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

  // Corner actions on the account visual. The adjust action comes from the
  // shared hook (non-sticky so it collapses into the overflow menu with the
  // rest); the others bridge into add-transaction, the config sheet and delete.
  const cardActions = (acc: Account): Array<Action<Account>> => [
    { ...adjustAction(acc), sticky: true },
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
      id: ACTION_ID.FILTERS,
      sticky: true,
      icon: APP_ICONS.filter,
      accessibilityLabel: t("dashboard.card.filters"),
      onPress: () => {
        setFiltersOpen(true)
      },
    },
    {
      id: ACTION_ID.DELETE,
      sticky: true,
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
            setFiltersOpen(true)
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
