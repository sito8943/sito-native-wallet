import { type ReactElement } from "react"

import BottomSheet from "#design/patterns/BottomSheet"
import { useI18n } from "#shared/i18n"

import { TransactionForm } from "../TransactionForm"

import { type TransactionFormSheetProps } from "./types"

// Adds a transaction from an overlay context (e.g. the dashboard's
// current-balance card) without navigating — sidesteps cross-tab navigation
// that would leave no back button. The form is mounted only while open so it
// resets between opens.
export default function TransactionFormSheet({
  open,
  onClose,
  defaultAccountId,
  onSubmit,
}: TransactionFormSheetProps): ReactElement {
  const { t } = useI18n()

  return (
    <BottomSheet open={open} title={t("transactions.new.title")} onClose={onClose}>
      {open && (
        <TransactionForm
          defaultAccountId={defaultAccountId}
          submitLabel={t("transactions.new.submit")}
          onSubmit={(values) => {
            onSubmit(values)
            onClose()
          }}
        />
      )}
    </BottomSheet>
  )
}
