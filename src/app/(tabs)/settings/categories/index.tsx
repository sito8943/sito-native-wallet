import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  CategoryCard,
  type TransactionCategory,
  useCategories,
} from "#shared/categories"
import { useDeleteDialog } from "#shared/dialogs"
import { toCategoryDetailsRoute, toNewCategoryRoute } from "#shared/navigation"

export default function Categories(): ReactElement {
  const router = useRouter()
  const { data, removeCategory } = useCategories()

  const deleteDialog = useDeleteDialog<TransactionCategory>({
    onConfirm: (category) => {
      removeCategory(category.id)
    },
    title: "Delete category",
    message: "This category will be removed permanently.",
  })

  return (
    <View style={{ flex: 1 }}>
      <Page scroll>
        {data
          .filter((category) => category.system !== true)
          .map((category) => (
            <CategoryCard
              key={category.id}
              actions={[deleteDialog.action(category)]}
              category={category}
              onPress={() => router.push(toCategoryDetailsRoute(category.id))}
            />
          ))}
      </Page>
      <FAB
        accessibilityLabel="Add category"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewCategoryRoute())}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel="Delete" />
    </View>
  )
}
