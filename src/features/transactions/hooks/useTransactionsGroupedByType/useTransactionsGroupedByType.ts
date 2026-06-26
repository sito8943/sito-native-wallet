import { useEffect, useState } from "react"

import { type Account } from "#features/accounts"
import { TRANSACTION_TYPE } from "#features/categories"
import { useIsOnline } from "#shared/network"

import {
  RemoteTransactionClient,
  type TransactionGroupedByType,
} from "../../clients/RemoteTransactionClient"
import useTransactionsTotal from "../useTransactionsTotal/useTransactionsTotal"

type RemoteTotals = TransactionGroupedByType & { accountId: number }

const pad = (value: number): string => `${value}`.padStart(2, "0")

const getCurrentMonthRange = (): { start: string; end: string } => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthValue = pad(month + 1)
  const lastDay = new Date(year, month + 1, 0).getDate()

  return {
    start: `${year}/${monthValue}/01`,
    end: `${year}/${monthValue}/${pad(lastDay)}`,
  }
}

// Uses the server's grouped-by-type contract while online so balanceAnchorAt,
// current-month and automatic-category rules stay identical to the web wallet.
// The local calculation is an immediate/offline fallback with the rules that
// can be derived from the synchronized transaction store.
export default function useTransactionsGroupedByType(
  account: Account | null,
): TransactionGroupedByType {
  const isOnline = useIsOnline()
  const date = getCurrentMonthRange()
  const [remoteTotals, setRemoteTotals] = useState<RemoteTotals | null>(null)

  const commonFilters = {
    // Local ids are positive; 0 intentionally matches nothing while account
    // selection hydrates, avoiding a transient all-accounts summary.
    accountId: account?.id ?? 0,
    date,
    manualOrWithAnyManualCategory: true,
  }
  const localIncome = useTransactionsTotal({
    ...commonFilters,
    type: TRANSACTION_TYPE.INCOME,
  })
  const localExpense = useTransactionsTotal({
    ...commonFilters,
    type: TRANSACTION_TYPE.EXPENSE,
  })

  const remoteAccountId = account?.remoteId
  useEffect(() => {
    if (!isOnline || remoteAccountId === undefined) {
      setRemoteTotals(null)
      return
    }

    let active = true
    setRemoteTotals((current) =>
      current?.accountId === remoteAccountId ? current : null,
    )

    void RemoteTransactionClient.getGroupedByType(remoteAccountId)
      .then((totals) => {
        if (active) {
          setRemoteTotals({ accountId: remoteAccountId, ...totals })
        }
      })
      .catch(() => {
        if (active) {
          setRemoteTotals(null)
        }
      })

    return () => {
      active = false
    }
  }, [isOnline, remoteAccountId])

  return remoteTotals !== null && remoteTotals.accountId === remoteAccountId
    ? remoteTotals
    : { incomeTotal: localIncome, expenseTotal: localExpense }
}
