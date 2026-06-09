import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import { BUTTON_VARIANT } from "#design/elements/Button"
import Empty from "#design/templates/Empty"
import Page from "#design/templates/Page"
import { useAccounts } from "#features/accounts"
import { useCategories } from "#features/categories"
import { useI18n } from "#shared/i18n"
import { toAccountsRoute, toCategoriesRoute } from "#shared/navigation"

import { type AddTransactionDto } from "../dtos"
import { TransactionForm } from "../TransactionForm"
import { useTransactions } from "../useTransactions"

import { type NewTransactionScreenProps } from "./types"

// Shared "add transaction" screen. Mounted by both the transactions tab and the
// accounts stack so the back button stays inside whichever stack opened it
// (pushing the transactions-tab route from settings jumps tabs and leaves no
// back button). `accountId` pre-selects the owning account.
export default function NewTransactionScreen({
  accountId,
}: NewTransactionScreenProps): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { addTransaction } = useTransactions()
  const { data: accounts } = useAccounts()
  // A transaction needs an account and at least one (non-system) category, so
  // both must exist before the form is usable.
  const { data: categories } = useCategories({ includeSystem: false })

  const hasAccounts = (accounts ?? []).length > 0
  const hasCategories = categories.length > 0

  const handleSubmit = (values: AddTransactionDto): void => {
    addTransaction(values)
    router.back()
  }

  // Account first, then category — guide one missing prerequisite at a time,
  // each with its own message and CTA.
  if (!hasAccounts) {
    return (
      <Page scroll>
        <Empty
          message={t("transactions.new.needAccount")}
          actions={[
            {
              children: t("accounts.add"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toAccountsRoute()),
            },
          ]}
        />
      </Page>
    )
  }

  if (!hasCategories) {
    return (
      <Page scroll>
        <Empty
          message={t("transactions.new.needCategory")}
          actions={[
            {
              children: t("categories.add"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toCategoriesRoute()),
            },
          ]}
        />
      </Page>
    )
  }

  return (
    <Page scroll>
      <TransactionForm
        defaultAccountId={accountId}
        submitLabel={t("transactions.new.submit")}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
