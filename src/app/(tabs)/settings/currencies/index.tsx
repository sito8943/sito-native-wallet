import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  type Currency,
  CurrencyCard,
  useCurrencies,
} from "#features/currencies"
import { useI18n } from "#shared/i18n"
import {
  toCurrencyDetailsRoute,
  toCurrencyPrefabsRoute,
  toNewCurrencyRoute,
} from "#shared/navigation"

export default function Currencies(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data, removeCurrency } = useCurrencies()

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
