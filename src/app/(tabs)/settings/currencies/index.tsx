import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { CurrencyCard, useCurrencies } from "#shared/currencies"
import { toCurrencyDetailsRoute, toNewCurrencyRoute } from "#shared/navigation"

export default function Currencies(): ReactElement {
  const router = useRouter()
  const { data } = useCurrencies()

  return (
    <View style={{ flex: 1 }}>
      <Page scroll>
        {data.map((currency) => (
          <Pressable
            key={currency.id}
            onPress={() => router.push(toCurrencyDetailsRoute(currency.id))}
          >
            <CurrencyCard currency={currency} />
          </Pressable>
        ))}
      </Page>
      <FAB
        accessibilityLabel="Add currency"
        icon="plus"
        onPress={() => router.push(toNewCurrencyRoute())}
      />
    </View>
  )
}
