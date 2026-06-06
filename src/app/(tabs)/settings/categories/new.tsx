import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddCategoryDto,
  CategoryForm,
  useCategories,
} from "#features/categories"
import { useI18n } from "#shared/i18n"

export default function NewCategory(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { addCategory } = useCategories()

  const handleSubmit = (values: AddCategoryDto): void => {
    addCategory(values)
    router.back()
  }

  return (
    <Page scroll>
      <CategoryForm
        submitLabel={t("categories.create")}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
