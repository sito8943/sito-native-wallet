import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon from "#design/elements/Icon"
import { spacing } from "#design/foundations"
import { THEME_COLOR, useThemeColors } from "#shared/theme"

import { type EntityCardProps } from "./types"

const ACTION_ICON_SIZE = spacing[4]

// Wraps Card with a content area + a row of inline action buttons. Each action
// receives the entity, so deletes/edits work without leaving the list.
export default function EntityCard<T>({
  entity,
  children,
  actions = [],
  onPress,
  style,
}: EntityCardProps<T>): ReactElement {
  const colors = useThemeColors()
  const visibleActions = actions.filter((action) => action.hidden !== true)

  return (
    <Card style={style}>
      <View style={styles.row}>
        <Pressable
          disabled={onPress === undefined}
          style={styles.content}
          onPress={onPress}
        >
          {children}
        </Pressable>

        {visibleActions.length > 0 && (
          <View style={styles.actions}>
            {visibleActions.map((action) => (
              <Pressable
                key={action.id}
                accessibilityLabel={action.accessibilityLabel}
                accessibilityRole="button"
                disabled={action.disabled}
                hitSlop={spacing[2]}
                style={styles.action}
                onPress={() => {
                  action.onPress(entity)
                }}
              >
                <Icon
                  color={
                    action.disabled === true
                      ? colors[THEME_COLOR.TEXT_SUBTLE]
                      : colors[action.color ?? THEME_COLOR.TEXT_MUTED]
                  }
                  icon={action.icon}
                  size={ACTION_ICON_SIZE}
                />
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
  },
  content: {
    flex: 1,
  },
  actions: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[1],
  },
  action: {
    padding: spacing[2],
  },
})
