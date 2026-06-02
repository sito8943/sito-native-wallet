import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { type AddAccountDto, AccountForm, useAccounts } from "#shared/accounts"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditAccount(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data, isLoading, updateAccount, removeAccount } = useAccounts()

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  const account = data?.find((item) => item.id === id)

  if (account === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Account not found
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddAccountDto): void => {
    updateAccount(account.id, values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      "Delete account",
      `Delete "${account.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeAccount(account.id)
            // Pop past the now-deleted account detail back to the list.
            router.dismissAll()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <AccountForm
        submitLabel="Save"
        defaultValues={{
          name: account.name,
          bankName: account.bankName,
          balance: account.balance,
          type: account.type,
          currency: account.currency,
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
