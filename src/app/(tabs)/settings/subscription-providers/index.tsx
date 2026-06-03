import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
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
    <View style={styles.screen}>
      <Page>
        <EntityList
          data={data}
          emptyMessage="No subscription providers yet."
          renderItem={(provider) => (
            <SubscriptionProviderCard
              actions={[deleteDialog.action(provider)]}
              provider={provider}
              onPress={() =>
                router.push(toSubscriptionProviderDetailsRoute(provider.id))
              }
            />
          )}
        />
      </Page>
      <FAB
        accessibilityLabel="Add subscription provider"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewSubscriptionProviderRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel="Delete" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
