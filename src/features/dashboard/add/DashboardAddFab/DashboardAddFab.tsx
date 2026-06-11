import { useState, type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import FAB from "#design/patterns/FAB"
import { useI18n } from "#shared/i18n"

import { useDashboard } from "../../data/useDashboard"
import AddCardSheet from "../AddCardSheet"

// Floating add-card action. Lives at screen level (outside the scroll) so the
// FAB stays pinned while the dashboard scrolls; new cards append at the end.
export default function DashboardAddFab(): ReactElement {
  const { t } = useI18n()
  const { data: cards, addCard } = useDashboard()
  const [open, setOpen] = useState(false)

  return (
    <>
      <FAB
        accessibilityLabel={t("dashboard.addCard.action")}
        icon={APP_ICONS.add}
        onPress={() => {
          setOpen(true)
        }}
      />
      <AddCardSheet
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        onSelect={(type) => {
          addCard({ type, position: cards.length })
          setOpen(false)
        }}
      />
    </>
  )
}
