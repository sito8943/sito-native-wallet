import { type ReactElement } from "react"

import { CurrencyCard, useCurrencies } from "#shared/currencies"
import Page from "#design/templates/Page"

export default function Currencies(): ReactElement {
  const { data } = useCurrencies()

  return (
    <Page scroll>
      {data?.map((currency) => (
        <CurrencyCard key={currency.id} currency={currency} />
      ))}
    </Page>
  )
}
