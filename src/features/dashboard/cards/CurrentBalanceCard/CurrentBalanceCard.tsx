import { useState, type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { AccountSelector, useAccounts } from "#features/accounts"
import { useI18n } from "#shared/i18n"

import ActiveFilters from "../ActiveFilters"
import CardFrame from "../CardFrame"
import { useDashboard } from "../../data/useDashboard"
import { formatAmount, toAccountSnapshot } from "../../utils"

import { type CurrentBalanceCardProps } from "./types"
import { parseConfig } from "./utils"

// Shows one account's balance. No "all accounts" total — summing across
// currencies is meaningless — so an unset account prompts the user to pick one.
export default function CurrentBalanceCard({
  card,
  onDelete,
}: CurrentBalanceCardProps): ReactElement {
  const { t } = useI18n()
  const accounts = useAccounts().data ?? []
  const { updateTitle, updateConfig } = useDashboard()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const config = parseConfig(card.config)
  const account =
    accounts.find((item) => item.id === config.account?.id) ?? null

  const noAccountLabel = t("dashboard.currentBalance.noAccount")

  const selectAccount = (accountId: number) => {
    const selected = accounts.find((item) => item.id === accountId) ?? null
    updateConfig(
      card.id,
      JSON.stringify({
        account: selected ? toAccountSnapshot(selected) : null,
      }),
    )
  }

  return (
    <>
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
            labels={[account ? account.name : noAccountLabel]}
            onPress={() => {
              setFiltersOpen(true)
            }}
          />
        }
      >
        <Typography variant={TYPOGRAPHY_VARIANT.DISPLAY}>
          {account
            ? formatAmount(account.balance, account.currency.symbol)
            : noAccountLabel}
        </Typography>
      </CardFrame>

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
    </>
  )
}
