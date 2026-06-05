import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import { useI18n } from "#shared/i18n"

import CurrentBalanceCard from "../CurrentBalanceCard"
import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../DashboardCard"
import TypeResumeCard from "../TypeResumeCard"
import { useDashboard } from "../useDashboard"

// The home dashboard: renders each stored card by type. Adding is handled by
// the floating DashboardAddFab; deleting routes through the shared
// confirmation dialog.
export default function DashboardGrid(): ReactElement {
  const { t } = useI18n()
  const { data: cards, removeCard } = useDashboard()

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

      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: spacing(2),
  },
})
