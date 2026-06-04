import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"
import { useDetailRouteParams } from "#shared/navigation"
import {
  type AddSubscriptionProviderDto,
  SubscriptionProviderForm,
  useSubscriptionProvider,
} from "#shared/subscriptionProviders"

export default function EditSubscriptionProvider(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { id } = useDetailRouteParams()
  const {
    data: provider,
    isLoading,
    update,
    remove,
  } = useSubscriptionProvider(id)

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (provider === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("subscriptionProviders.notFound")}
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddSubscriptionProviderDto): void => {
    update(values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      t("subscriptionProviders.delete.title"),
      t("subscriptionProviders.delete.message", { name: provider.name }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            remove()
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <SubscriptionProviderForm
        submitLabel={t("subscriptionProviders.save")}
        defaultValues={{
          name: provider.name,
          website: provider.website ?? "",
          description: provider.description ?? "",
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
