import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import { ICON_BUTTON_SIZE } from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  type Currency,
  CurrencyCard,
  useCurrencies,
  useCurrenciesSync,
} from "#features/currencies"
import { useI18n } from "#shared/i18n"
import {
  toCurrencyDetailsRoute,
  toCurrencyPrefabsRoute,
  toNewCurrencyRoute,
} from "#shared/navigation"

export default function Currencies(): ReactElement {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { t } = useI18n()
  const { data, removeCurrency } = useCurrencies()
  // Pull the user's currencies on sign-in and push local edits back (debounced).
  useCurrenciesSync()

  const deleteDialog = useDeleteDialog<Currency>({
    onConfirm: (currency) => {
      removeCurrency(currency.id)
    },
    title: t("currencies.delete.title"),
    message: t("currencies.delete.description"),
  })

  return (
    <View style={styles.screen}>
      <Page>
        <EntityList
          data={data}
          emptyMessage={t("currencies.empty")}
          emptyActions={[
            {
              children: t("currencies.addCommon"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toCurrencyPrefabsRoute()),
            },
          ]}
          onSwipeDelete={(currency) => () =>
            deleteDialog.action(currency).onPress(currency)
          }
          renderItem={(currency) => (
            <CurrencyCard
              actions={[deleteDialog.action(currency)]}
              currency={currency}
              onPress={() => router.push(toCurrencyDetailsRoute(currency.id))}
            />
          )}
        />
      </Page>
      <FAB
        accessibilityLabel={t("currencies.addCommon")}
        icon={APP_ICONS.prefabs}
        size={ICON_BUTTON_SIZE.MD}
        onPress={() => router.push(toCurrencyPrefabsRoute())}
        style={{ bottom: insets.bottom + spacing(16) }}
      />
      <FAB
        accessibilityLabel={t("currencies.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewCurrencyRoute())}
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
