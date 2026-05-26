import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { CurrencyCard, useTransactions } from "#shared/wallet"

export default function Currencies(): ReactElement {
  const { data } = useTransactions()
  const currencies = [
    ...new Map(
      data?.map((transaction) => [
        transaction.currency.id,
        transaction.currency,
      ]) ?? [],
    ).values(),
  ]

  return (
    <Page scroll>
      {currencies.map((currency) => (
        <CurrencyCard key={currency.id} currency={currency} />
      ))}
    </Page>
  )
}
