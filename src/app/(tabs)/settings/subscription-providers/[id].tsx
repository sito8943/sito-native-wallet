import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useDetailRouteParams } from "#shared/navigation"
import {
  type AddSubscriptionProviderDto,
  SubscriptionProviderForm,
  useSubscriptionProvider,
} from "#shared/subscriptionProviders"

export default function EditSubscriptionProvider(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data: provider, isLoading, update, remove } =
    useSubscriptionProvider(id)

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
          Subscription provider not found
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
      "Delete provider",
      `Delete "${provider.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
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
        submitLabel="Save"
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
