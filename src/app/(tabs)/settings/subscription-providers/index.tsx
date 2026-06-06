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
  type SubscriptionProvider,
  SubscriptionProviderCard,
  useSubscriptionProviders,
} from "#features/subscriptionProviders"
import { useI18n } from "#shared/i18n"
import {
  toNewSubscriptionProviderRoute,
  toSubscriptionProviderDetailsRoute,
} from "#shared/navigation"

export default function SubscriptionProviders(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data, removeSubscriptionProvider } = useSubscriptionProviders()

  const deleteDialog = useDeleteDialog<SubscriptionProvider>({
    onConfirm: (provider) => {
      removeSubscriptionProvider(provider.id)
    },
    title: t("subscriptionProviders.delete.title"),
    message: t("subscriptionProviders.delete.description"),
  })

  return (
    <View style={styles.screen}>
      <Page>
        <EntityList
          data={data}
          emptyMessage={t("subscriptionProviders.empty")}
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
        accessibilityLabel={t("subscriptionProviders.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewSubscriptionProviderRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
