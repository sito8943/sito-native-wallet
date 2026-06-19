import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import { spacing } from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { useI18n } from "#shared/i18n"

import {
  DASHBOARD_CARD_TYPE,
  type DashboardCardType,
} from "../../cards/DashboardCard"

import { type AddCardSheetProps } from "./types"

// Lets the user add a new card by picking its type.
export default function AddCardSheet({
  open,
  onClose,
  onSelect,
}: AddCardSheetProps): ReactElement {
  const { t } = useI18n()

  const options: Array<{ type: DashboardCardType; label: string }> = [
    {
      type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
      label: t("dashboard.type.currentBalance"),
    },
    {
      type: DASHBOARD_CARD_TYPE.TYPE_RESUME,
      label: t("dashboard.type.typeResume"),
    },
    {
      type: DASHBOARD_CARD_TYPE.BALANCE_HISTORY,
      label: t("dashboard.type.balanceHistory"),
    },
  ]

  return (
    <BottomSheet
      open={open}
      title={t("dashboard.addCard.title")}
      onClose={onClose}
    >
      <View style={styles.options}>
        {options.map((option) => (
          <Button
            key={option.type}
            accessibilityLabel={option.label}
            variant={BUTTON_VARIANT.OUTLINED}
            onPress={() => {
              onSelect(option.type)
            }}
          >
            {option.label}
          </Button>
        ))}
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  options: {
    gap: spacing(3),
  },
})
