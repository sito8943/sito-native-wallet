import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"
import {
  type AddTransactionDto,
  TransactionForm,
  useTransactions,
} from "#shared/transactions"

export default function NewTransaction(): ReactElement {
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
        submitLabel={t("transactions.new.submit")}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
