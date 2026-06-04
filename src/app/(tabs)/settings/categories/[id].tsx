import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  type AddCategoryDto,
  CategoryForm,
  useCategory,
} from "#shared/categories"
import { useI18n } from "#shared/i18n"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditCategory(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { id } = useDetailRouteParams()
  const { data: category, isLoading, update, remove } = useCategory(id)

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (category === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("categories.notFound")}
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddCategoryDto): void => {
    update(values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      t("categories.delete.title"),
      t("categories.delete.message", { name: category.name }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            remove()
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <CategoryForm
        submitLabel={t("categories.save")}
        defaultValues={{
          name: category.name,
          description: category.description,
          color: category.color,
          type: category.type,
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
