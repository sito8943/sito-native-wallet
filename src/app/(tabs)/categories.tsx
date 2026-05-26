import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { CategoryCard, useTransactions } from "#shared/wallet"

export default function Categories(): ReactElement {
  const { data } = useTransactions()
  const categories = [
    ...new Map(
      data
        ?.flatMap((transaction) => transaction.categories)
        .map((category) => [category.id, category]) ?? [],
    ).values(),
  ]

  return (
    <Page scroll>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Page>
  )
}
