import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { THEME_COLOR, useThemeColors } from "#design/theme"

import { type EntityCardProps } from "./types"

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
      <View style={styles.column}>
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
              <IconButton
                key={action.id}
                accessibilityLabel={action.accessibilityLabel}
                disabled={action.disabled}
                hitSlop={spacing(2)}
                icon={action.icon}
                color={
                  action.disabled === true
                    ? colors[THEME_COLOR.TEXT_SUBTLE]
                    : colors[action.color ?? THEME_COLOR.TEXT_MUTED]
                }
                onPress={() => {
                  action.onPress(entity)
                }}
                size={ICON_BUTTON_SIZE.LG}
                variant={ICON_BUTTON_VARIANT.TEXT}
              />
            ))}
          </View>
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    gap: spacing(4),
    padding: spacing(1),
  },
  content: {
    flex: 1,
  },
  actions: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: spacing(1),
  },
})
