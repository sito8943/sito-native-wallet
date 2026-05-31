import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  type AddCategoryDto,
  CategoryForm,
  useCategories,
} from "#shared/categories"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditCategory(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data, isLoading, updateCategory, removeCategory } = useCategories()

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  const category = data.find((item) => item.id === id)

  if (category === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Category not found
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddCategoryDto): void => {
    updateCategory(category.id, values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      "Delete category",
      `Delete "${category.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeCategory(category.id)
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <CategoryForm
        submitLabel="Save"
        defaultValues={{
          name: category.name,
          color: category.color,
          type: category.type,
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
