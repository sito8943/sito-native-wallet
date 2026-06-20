import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import BottomSheet from "#design/patterns/BottomSheet"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { DASHBOARD_CARD_TYPE } from "../../cards/DashboardCard"

import { type AddCardSheetProps, type Option } from "./types"

// Lets the user add a new card by picking its type. Each option shows what the
// card does (icon + name + one-line description) so the choice explains itself.
export default function AddCardSheet({
  open,
  onClose,
  onSelect,
}: AddCardSheetProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()

  const options: Option[] = [
    {
      type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
      label: t("dashboard.type.currentBalance"),
      description: t("dashboard.type.currentBalance.description"),
      icon: APP_ICONS.accounts,
    },
    {
      type: DASHBOARD_CARD_TYPE.TYPE_RESUME,
      label: t("dashboard.type.typeResume"),
      description: t("dashboard.type.typeResume.description"),
      icon: APP_ICONS.list,
    },
    {
      type: DASHBOARD_CARD_TYPE.BALANCE_HISTORY,
      label: t("dashboard.type.balanceHistory"),
      description: t("dashboard.type.balanceHistory.description"),
      icon: APP_ICONS.in,
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
          <Pressable
            key={option.type}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            style={[styles.option, { borderColor: colors.border }]}
            onPress={() => {
              onSelect(option.type)
            }}
          >
            <View
              style={[styles.iconWrap, { backgroundColor: colors.background }]}
            >
              <Icon
                icon={option.icon}
                color={colors.primary}
                size={spacing(5)}
              />
            </View>
            <View style={styles.copy}>
              <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG}>
                {option.label}
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANT.CAPTION}
                tone={TYPOGRAPHY_TONE.MUTED}
              >
                {option.description}
              </Typography>
            </View>
            <Icon
              icon={APP_ICONS.chevronRight}
              color={colors.textMuted}
              size={spacing(4)}
            />
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  options: {
    gap: spacing(3),
  },
  option: {
    alignItems: "center",
    borderRadius: radius.md,
    borderWidth: borderWidth.thin,
    flexDirection: "row",
    gap: spacing(3),
    padding: spacing(3),
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: radius.full,
    height: spacing(10),
    justifyContent: "center",
    width: spacing(10),
  },
  copy: {
    flex: 1,
    gap: spacing(1),
  },
})
