import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  CategoryCard,
  type TransactionCategory,
  useCategories,
} from "#shared/categories"
import { toCategoryDetailsRoute, toNewCategoryRoute } from "#shared/navigation"

export default function Categories(): ReactElement {
  const router = useRouter()
  // System categories (balance adjustment) aren't user-managed — hide them.
  const { data, removeCategory } = useCategories({ includeSystem: false })

  const deleteDialog = useDeleteDialog<TransactionCategory>({
    onConfirm: (category) => {
      removeCategory(category.id)
    },
    title: "Delete category",
    message: "This category will be removed permanently.",
  })

  return (
    <View style={styles.screen}>
      <Page scroll>
        {data.map((category) => (
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
