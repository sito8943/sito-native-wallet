import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddCategoryDto,
  CategoryForm,
  useCategories,
} from "#shared/categories"

export default function NewCategory(): ReactElement {
  const router = useRouter()
  const { addCategory } = useCategories()

  const handleSubmit = (values: AddCategoryDto): void => {
    addCategory(values)
    router.back()
  }

  return (
    <Page scroll>
      <CategoryForm submitLabel="Create" onSubmit={handleSubmit} />
    </Page>
  )
}
