import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"
import { StyleSheet } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { ICON_BUTTON_SIZE } from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import { useI18n } from "#shared/i18n"
import { toNewTransactionRoute } from "#shared/navigation"

import { useDashboard } from "../../../data/useDashboard"
import AddCardSheet from "../AddCardSheet"

// Two stacked FABs on the home dashboard, bottom-right. The primary (bottom) is
// the everyday action; the secondary (top) toggles dashboard edit mode:
//
//   normal   → primary: add transaction      secondary: enter edit (pencil)
//   editing  → primary: add a dashboard card  secondary: done (check)
//
// Edit mode only changes what the FABs do — reordering and deleting cards stay
// available in the grid at all times.
export default function DashboardActionFabs(): ReactElement {
  const { t } = useI18n()
  const router = useRouter()
  const { data: cards, addCard } = useDashboard()
  const [editing, setEditing] = useState(false)
  const [addCardOpen, setAddCardOpen] = useState(false)

  const exitEditing = () => {
    setEditing(false)
    setAddCardOpen(false)
  }

  const onPrimaryPress = () => {
    if (editing) {
      setAddCardOpen(true)
      return
    }

    router.push(toNewTransactionRoute())
  }

  return (
    <>
      {/* Secondary FAB, lifted above the primary via translateY so both sit in
          the same bottom-right slot without a wrapping layout container. */}
      <FAB
        accessibilityLabel={
          editing ? t("dashboard.editMode.done") : t("dashboard.editMode.action")
        }
        icon={editing ? APP_ICONS.check : APP_ICONS.edit}
        onPress={editing ? exitEditing : () => setEditing(true)}
        size={ICON_BUTTON_SIZE.MD}
        style={styles.secondary}
      />

      <FAB
        accessibilityLabel={
          editing ? t("dashboard.addCard.action") : t("transactions.add")
        }
        icon={APP_ICONS.add}
        onPress={onPrimaryPress}
      />

      <AddCardSheet
        open={addCardOpen}
        onClose={() => {
          setAddCardOpen(false)
        }}
        onSelect={(type) => {
          addCard({ type, position: cards.length })
          setAddCardOpen(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  // Lift the secondary FAB one button-height (LG ≈ spacing(12)) plus a gap above
  // the primary, so they stack in the same bottom-right corner.
  secondary: {
    transform: [{ translateY: -spacing(15) }],
  },
})
