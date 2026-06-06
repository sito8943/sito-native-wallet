import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"

import { type AddTransactionDto } from "../dtos"
import { TransactionForm } from "../TransactionForm"
import { useTransactions } from "../useTransactions"

import { type TransactionDetailScreenProps } from "./types"

// Shared transaction detail/edit screen. Mounted by both the transactions tab
// and the accounts stack so the back button stays inside whichever stack
// opened it (pushing the transactions-tab route from settings jumps tabs and
// breaks the back button).
export default function TransactionDetailScreen({
  id,
}: TransactionDetailScreenProps): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data, isLoading, updateTransaction, removeTransaction } =
    useTransactions()

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  const transaction = data.find((item) => item.id === id)

  if (transaction === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("transactions.notFound")}
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddTransactionDto): void => {
    updateTransaction(transaction.id, values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      t("transactions.delete.title"),
      t("transactions.delete.message", { name: transaction.description }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            removeTransaction(transaction.id)
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <TransactionForm
        submitLabel={t("common.save")}
        defaultValues={{
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          accountId: transaction.account.id,
          categoryIds: transaction.categories.map((category) => category.id),
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        auto={transaction.auto}
      />
    </Page>
  )
}
