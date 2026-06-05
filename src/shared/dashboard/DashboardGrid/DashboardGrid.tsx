import { useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import { useI18n } from "#shared/i18n"

import AddCardButton from "../AddCardButton"
import AddCardSheet from "../AddCardSheet"
import CurrentBalanceCard from "../CurrentBalanceCard"
import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../DashboardCard"
import TypeResumeCard from "../TypeResumeCard"
import { useDashboard } from "../useDashboard"
import WeeklySpentCard from "../WeeklySpentCard"

// The home dashboard: renders each stored card by type, plus the add-card
// button. Deleting routes through the shared confirmation dialog.
export default function DashboardGrid(): ReactElement {
  const { t } = useI18n()
  const { data: cards, addCard, removeCard } = useDashboard()
  const [addOpen, setAddOpen] = useState(false)

  const deleteDialog = useDeleteDialog<DashboardCard>({
    onConfirm: (card) => {
      removeCard(card.id)
    },
    title: t("dashboard.card.delete.title"),
    message: t("dashboard.card.delete.message"),
  })

  // The built action ignores its argument and closes over the card, so calling
  // its onPress opens the confirmation for that card.
  const requestDelete = (card: DashboardCard) => {
    deleteDialog.action(card).onPress(card)
  }

  const renderCard = (card: DashboardCard): ReactElement | null => {
    const onDelete = () => {
      requestDelete(card)
    }

    switch (card.type) {
      case DASHBOARD_CARD_TYPE.CURRENT_BALANCE:
        return <CurrentBalanceCard card={card} onDelete={onDelete} />
      case DASHBOARD_CARD_TYPE.WEEKLY_SPENT:
        return <WeeklySpentCard card={card} onDelete={onDelete} />
      case DASHBOARD_CARD_TYPE.TYPE_RESUME:
        return <TypeResumeCard card={card} onDelete={onDelete} />
      default:
        return null
    }
  }

  return (
    <View style={styles.list}>
      {cards.length === 0 && (
        <Typography tone={TYPOGRAPHY_TONE.MUTED}>
          {t("dashboard.empty")}
        </Typography>
      )}

      {cards.map((card) => (
        <View key={card.id}>{renderCard(card)}</View>
      ))}

      <AddCardButton
        onPress={() => {
          setAddOpen(true)
        }}
      />

      <AddCardSheet
        open={addOpen}
        onClose={() => {
          setAddOpen(false)
        }}
        onSelect={(type) => {
          addCard({ type, position: cards.length })
          setAddOpen(false)
        }}
      />
      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: spacing(2),
  },
})
