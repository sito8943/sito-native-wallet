import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import { BUTTON_VARIANT } from "#design/elements/Button"
import BottomSheet from "#design/patterns/BottomSheet"
import Empty from "#design/templates/Empty"
import { useCategories } from "#features/categories"
import { useI18n } from "#shared/i18n"
import { toCategoriesRoute } from "#shared/navigation"

import { TransactionForm } from "../TransactionForm"

import { type TransactionFormSheetProps } from "./types"

// Adds a transaction from an overlay context (e.g. the dashboard's
// current-balance card) without navigating — sidesteps cross-tab navigation
// that would leave no back button. The form is mounted only while open so it
// resets between opens. The account is always provided by the caller, but a
// (non-system) category must exist, so it guards on that.
export default function TransactionFormSheet({
  open,
  onClose,
  defaultAccountId,
  defaultCategoryIds,
  onSubmit,
}: TransactionFormSheetProps): ReactElement {
  const { t } = useI18n()
  const router = useRouter()
  const { data: categories } = useCategories({ includeSystem: false })
  const hasCategories = categories.length > 0

  return (
    <BottomSheet
      open={open}
      title={t("transactions.new.title")}
      onClose={onClose}
    >
      {open &&
        (hasCategories ? (
          <TransactionForm
            defaultAccountId={defaultAccountId}
            defaultCategoryIds={defaultCategoryIds}
            submitLabel={t("transactions.new.submit")}
            onSubmit={(values) => {
              onSubmit(values)
              onClose()
            }}
          />
        ) : (
          <Empty
            message={t("transactions.new.needCategory")}
            actions={[
              {
                children: t("categories.add"),
                variant: BUTTON_VARIANT.OUTLINED,
                onPress: () => {
                  onClose()
                  router.push(toCategoriesRoute())
                },
              },
            ]}
          />
        ))}
    </BottomSheet>
  )
}
