import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import DraggableList from "#design/patterns/DraggableList"
import Empty from "#design/templates/Empty"
import { useThemeColors } from "#design/theme"
import { useAccounts } from "#features/accounts"
import { useI18n } from "#shared/i18n"
import { toAccountsRoute } from "#shared/navigation"

import { useDashboard } from "../../data/useDashboard"
import AddCardSheet from "../add/AddCardSheet"
import BalanceHistoryCard from "../cards/BalanceHistoryCard"
import CurrentBalanceCard from "../cards/CurrentBalanceCard"
import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../cards/DashboardCard"
import LastTransactionsCard from "../cards/LastTransactionsCard"
import TypeResumeCard from "../cards/TypeResumeCard"

// The home dashboard: renders each stored card by type. Long-press a card to
// drag it into a new order (persisted via reorderCards). Adding is handled by
// the floating DashboardActionFabs (in edit mode); deleting routes through the
// shared confirmation dialog.
export default function DashboardGrid(): ReactElement {
  const { t } = useI18n()
  const router = useRouter()
  const colors = useThemeColors()
  const { data: cards, addCard, removeCard, reorderCards } = useDashboard()
  const { data: accounts } = useAccounts()
  const hasAccounts = (accounts ?? []).length > 0
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

  const renderCard = (card: DashboardCard): ReactElement => {
    const onDelete = () => {
      requestDelete(card)
    }

    switch (card.type) {
      case DASHBOARD_CARD_TYPE.CURRENT_BALANCE:
        return <CurrentBalanceCard card={card} onDelete={onDelete} />
      case DASHBOARD_CARD_TYPE.TYPE_RESUME:
        return <TypeResumeCard card={card} onDelete={onDelete} />
      case DASHBOARD_CARD_TYPE.BALANCE_HISTORY:
        return <BalanceHistoryCard card={card} onDelete={onDelete} />
      case DASHBOARD_CARD_TYPE.LAST_TRANSACTIONS:
        return <LastTransactionsCard card={card} onDelete={onDelete} />
      default:
        return <View />
    }
  }

  if (cards.length === 0) {
    return (
      <View style={styles.empty}>
        {hasAccounts ? (
          // Has an account → explain what the dashboard is and let them add the
          // first card right here (same picker as the + FAB).
          <View style={styles.intro}>
            <View
              style={[styles.introIcon, { backgroundColor: colors.surface }]}
            >
              <Icon
                icon={APP_ICONS.dashboard}
                color={colors.primary}
                size={spacing(8)}
              />
            </View>
            <Typography
              variant={TYPOGRAPHY_VARIANT.TITLE}
              style={styles.introCentered}
            >
              {t("dashboard.empty.title")}
            </Typography>
            <Typography
              variant={TYPOGRAPHY_VARIANT.BODY}
              tone={TYPOGRAPHY_TONE.MUTED}
              style={styles.introCentered}
            >
              {t("dashboard.empty.subtitle")}
            </Typography>
            <Button
              accessibilityLabel={t("dashboard.empty.addAction")}
              onPress={() => {
                setAddOpen(true)
              }}
            >
              {t("dashboard.empty.addAction")}
            </Button>
          </View>
        ) : (
          // Brand-new user → guide to set up the foundation (an account) first.
          <Empty
            message={t("dashboard.empty")}
            actions={[
              {
                children: t("dashboard.empty.action"),
                variant: BUTTON_VARIANT.OUTLINED,
                // withAnchor seeds settings/index beneath the target so the
                // section has a back button and the tab resets to /settings.
                onPress: () =>
                  router.push(toAccountsRoute(), { withAnchor: true }),
              },
            ]}
          />
        )}
        <ConfirmationDialog
          {...deleteDialog}
          confirmLabel={t("common.delete")}
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
      </View>
    )
  }

  return (
    <>
      <DraggableList
        contentStyle={styles.listContent}
        data={cards}
        keyExtractor={(card) => card.id.toString()}
        onReorder={(orderedKeys) => {
          reorderCards(orderedKeys.map(Number))
        }}
        renderItem={renderCard}
        style={styles.list}
      />

      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </>
  )
}

const styles = StyleSheet.create({
  // Cancel the Page's horizontal padding so the scroll reaches the screen edges;
  // the cards are re-inset via listContent below. Without this the ScrollView
  // clips each card's side shadow at its frame.
  list: {
    flex: 1,
    marginHorizontal: -spacing(4),
  },
  // Re-inset the cards (matching the Page padding) so there's room for their
  // shadow inside the now full-width scroll.
  listContent: {
    paddingHorizontal: spacing(4),
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    alignItems: "center",
    gap: spacing(4),
    paddingHorizontal: spacing(6),
  },
  introIcon: {
    alignItems: "center",
    borderRadius: radius.full,
    height: spacing(20),
    justifyContent: "center",
    width: spacing(20),
  },
  introCentered: {
    textAlign: "center",
  },
})
