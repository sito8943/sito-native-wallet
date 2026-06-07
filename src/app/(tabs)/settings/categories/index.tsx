import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  CategoryCard,
  type TransactionCategory,
  useCategories,
} from "#features/categories"
import { useI18n } from "#shared/i18n"
import {
  toCategoryDetailsRoute,
  toCategoryPrefabsRoute,
  toNewCategoryRoute,
} from "#shared/navigation"

export default function Categories(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  // System categories (balance adjustment) aren't user-managed — hide them.
  const { data, removeCategory } = useCategories({ includeSystem: false })

  const deleteDialog = useDeleteDialog<TransactionCategory>({
    onConfirm: (category) => {
      removeCategory(category.id)
    },
    title: t("categories.delete.title"),
    message: t("categories.delete.description"),
  })

  return (
    <View style={styles.screen}>
      <Page>
        <EntityList
          data={data}
          emptyMessage={t("categories.empty")}
          emptyActions={[
            {
              children: t("categories.addSuggested"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toCategoryPrefabsRoute()),
            },
          ]}
          onSwipeDelete={(category) => () =>
            deleteDialog.action(category).onPress(category)
          }
          renderItem={(category) => (
            <CategoryCard
              actions={[deleteDialog.action(category)]}
              category={category}
              onPress={() => router.push(toCategoryDetailsRoute(category.id))}
            />
          )}
        />
      </Page>
      <FAB
        accessibilityLabel={t("categories.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewCategoryRoute())}
      />
      <ConfirmationDialog
        {...deleteDialog}
        confirmLabel={t("categories.delete.confirm")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
