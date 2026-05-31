import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { View } from "react-native"

import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { useDeleteDialog } from "#shared/dialogs"
import {
  toNewSubscriptionProviderRoute,
  toSubscriptionProviderDetailsRoute,
} from "#shared/navigation"
import {
  type SubscriptionProvider,
  SubscriptionProviderCard,
  useSubscriptionProviders,
} from "#shared/subscriptionProviders"

export default function SubscriptionProviders(): ReactElement {
  const router = useRouter()
  const { data, removeSubscriptionProvider } = useSubscriptionProviders()

  const deleteDialog = useDeleteDialog<SubscriptionProvider>({
    onConfirm: (provider) => {
      removeSubscriptionProvider(provider.id)
    },
    title: "Delete provider",
    message: "This subscription provider will be removed permanently.",
  })

  return (
    <View style={{ flex: 1 }}>
      <Page scroll>
        {data.map((provider) => (
          <SubscriptionProviderCard
            key={provider.id}
            actions={[deleteDialog.action(provider)]}
            provider={provider}
            onPress={() =>
              router.push(toSubscriptionProviderDetailsRoute(provider.id))
            }
          />
        ))}
      </Page>
      <FAB
        accessibilityLabel="Add subscription provider"
        icon="plus"
        onPress={() => router.push(toNewSubscriptionProviderRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel="Delete" />
    </View>
  )
}
