import { type IconProp } from "@fortawesome/fontawesome-svg-core"

import { type ThemeColorName } from "#design/theme"

export type UseDeleteActionProps<T> = {
  onPress: (entity: T) => void
  id?: string
  icon?: IconProp
  accessibilityLabel?: string
  color?: ThemeColorName
  disabled?: boolean
  hidden?: boolean
}
