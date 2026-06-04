import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { type Currency, CurrencyCard, useCurrencies } from "#shared/currencies"
import { toCurrencyDetailsRoute, toNewCurrencyRoute } from "#shared/navigation"

export default function Currencies(): ReactElement {
  const router = useRouter()
  const { data, removeCurrency } = useCurrencies()

  const deleteDialog = useDeleteDialog<Currency>({
    onConfirm: (currency) => {
      removeCurrency(currency.id)
    },
    title: "Delete currency",
    message: "This currency will be removed permanently.",
  })

  return (
    <View style={styles.screen}>
      <Page>
        <EntityList
          data={data}
          emptyMessage="No currencies yet."
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
        accessibilityLabel="Add currency"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewCurrencyRoute())}
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
