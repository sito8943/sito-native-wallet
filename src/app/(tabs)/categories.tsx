import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { CategoryCard, useCategories } from "#shared/wallet"

export default function Categories(): ReactElement {
  const { data } = useCategories()

  return (
    <Page scroll>
      {data?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Page>
  )
}
