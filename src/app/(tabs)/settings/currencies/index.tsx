import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Page from "#design/templates/Page"
import { CurrencyCard, useCurrencies } from "#shared/currencies"
import { toCurrencyDetailsRoute } from "#shared/navigation"

export default function Currencies(): ReactElement {
  const router = useRouter()
  const { data } = useCurrencies()

  return (
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
  )
}
