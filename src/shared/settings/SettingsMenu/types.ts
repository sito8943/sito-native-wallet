import { type Href } from "expo-router"

import { type APP_ICONS } from "#design/elements/Icon"

export type SettingsMenuItem = {
  href: Href
  icon: (typeof APP_ICONS)[keyof typeof APP_ICONS]
  label: string
}
