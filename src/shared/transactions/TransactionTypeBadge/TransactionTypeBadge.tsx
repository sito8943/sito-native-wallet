import { type ReactElement } from "react"

import { View, StyleSheet } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { TransactionType } from "#shared/categories"

import { useThemeColors } from "#shared/theme"

import { TRANSACTION_TYPE_LABELS } from "./constants"
import { type TransactionTypeBadgeProps } from "./types"

export default function TransactionTypeBadge({
  type,
  filled = true,
  showIcon = true,
  showText = true,
}: TransactionTypeBadgeProps): ReactElement {
  const colors = useThemeColors()

  const tone = type === TransactionType.In ? colors.positive : colors.negative

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: filled ? tone : colors.background,
        },
      ]}
    >
      {showIcon && (
        <Icon
          style={{ color: filled ? colors.textInverted : tone }}
          icon={type === TransactionType.In ? APP_ICONS.in : APP_ICONS.out}
        />
      )}
      {showText && (
        <Typography variant="caption" tone="inverted">
          {TRANSACTION_TYPE_LABELS[type]}
        </Typography>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,

    paddingHorizontal: 1,
    paddingVertical: 1,

    height: spacing.xxl,
    width: spacing.xxl,

    borderRadius: 999,
  },
})
