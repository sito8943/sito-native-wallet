import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { CurrencyCard, useCurrencies } from "#shared/wallet"

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
