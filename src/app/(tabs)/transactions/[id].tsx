import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useDetailRouteParams } from "#shared/navigation"
import {
  type AddTransactionDto,
  TransactionForm,
  useTransactions,
} from "#shared/transactions"

export default function EditTransaction(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
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
          Transaction not found
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
      "Delete transaction",
      `Delete "${transaction.description}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
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
        submitLabel="Save"
        defaultValues={{
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          accountId: transaction.account.id,
          categoryIds: transaction.categories.map((category) => category.id),
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
