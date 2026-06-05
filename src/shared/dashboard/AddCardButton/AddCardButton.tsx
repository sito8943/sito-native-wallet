import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type AddCardButtonProps } from "./types"

// Trailing card in the grid: a big plus that opens the add-card sheet.
export default function AddCardButton({
  onPress,
}: AddCardButtonProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const label = t("dashboard.addCard.action")

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
    >
      <Card>
        <View style={styles.content}>
          <Icon
            icon={APP_ICONS.add}
            color={colors.textMuted}
            size={spacing(7)}
          />
          <Typography tone={TYPOGRAPHY_TONE.MUTED}>{label}</Typography>
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(3),
    justifyContent: "center",
  },
})
