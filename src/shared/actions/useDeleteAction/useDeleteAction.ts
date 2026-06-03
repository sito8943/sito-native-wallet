import { useCallback } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import { THEME_COLOR } from "#design/theme"

import { ACTION_ID } from "../constants"
import { type Action } from "../types"

import { type UseDeleteActionProps } from "./types"

// Factory hook: returns an action(entity) builder pre-filled with delete
// defaults. The screen composes it into the list of actions per row.
export default function useDeleteAction<T>({
  onPress,
  id = ACTION_ID.DELETE,
  icon = APP_ICONS.delete,
  accessibilityLabel = "Delete",
  color = THEME_COLOR.NEGATIVE,
  disabled = false,
  hidden = false,
}: UseDeleteActionProps<T>): { action: (entity: T) => Action<T> } {
  const action = useCallback(
    (entity: T): Action<T> => ({
      id,
      icon,
      accessibilityLabel,
      color,
      disabled,
      hidden,
      onPress: () => {
        onPress(entity)
      },
    }),
    [accessibilityLabel, color, disabled, hidden, icon, id, onPress],
  )

  return { action }
}
