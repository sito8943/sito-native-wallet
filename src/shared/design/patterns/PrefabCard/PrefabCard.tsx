import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import { radius, spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { type PrefabCardProps } from "./types"

// A single selectable row for quick-add (prefab) pickers. Just the card +
// selection affordance; the surrounding list, selection state and confirm
// action stay with each screen so different prefab views can lay out freely.
export default function PrefabCard({
  selected,
  onPress,
  trailing,
  children,
}: PrefabCardProps): ReactElement {
  const colors = useThemeColors()

  return (
    <Pressable onPress={onPress}>
      <Card
        style={[
          styles.row,
          selected && { borderColor: colors.primary, borderWidth: 1 },
        ]}
      >
        <View style={styles.content}>{children}</View>

        <View style={styles.trailing}>
          {trailing}
          {selected && (
            <Icon
              icon={APP_ICONS.check}
              color={colors.primary}
              size={spacing(5)}
            />
          )}
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing(2),
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    gap: spacing(1),
  },
  trailing: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(4),
  },
})
