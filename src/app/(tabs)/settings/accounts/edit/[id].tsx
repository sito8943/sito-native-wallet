import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { type AddAccountDto, AccountForm, useAccount } from "#features/accounts"
import { useI18n } from "#shared/i18n"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditAccount(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { id } = useDetailRouteParams()
  const { data: account, isLoading, update, remove } = useAccount(id)

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (account === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("accounts.notFound")}
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddAccountDto): void => {
    update(values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      t("accounts.delete.title"),
      t("accounts.delete.message", { name: account.name }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            remove()
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
        submitLabel={t("accounts.save")}
        lockBalance
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
