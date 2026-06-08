import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"

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

  const handleSubmit = (values: AddTransactionDto): void => {
    addTransaction(values)
    router.back()
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
