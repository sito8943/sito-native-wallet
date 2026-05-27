import { type ReactElement } from "react"

import { CategoryCard, useCategories } from "#shared/categories"
import Page from "#design/templates/Page"

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
