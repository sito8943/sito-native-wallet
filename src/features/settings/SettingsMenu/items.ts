import { APP_ICONS } from "#design/elements/Icon"

import { type SettingsMenuItem } from "./types"

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    href: "/settings/profile",
    labelKey: "settings.menu.profile",
    icon: APP_ICONS.profile,
  },
  {
    href: "/settings/accounts",
    labelKey: "settings.menu.accounts",
    icon: APP_ICONS.accounts,
  },
  {
    href: "/settings/subscription-providers",
    labelKey: "settings.menu.subscriptionProviders",
    icon: APP_ICONS.subscriptionProviders,
  },
  {
    href: "/settings/categories",
    labelKey: "settings.menu.categories",
    icon: APP_ICONS.categories,
  },
  {
    href: "/settings/currencies",
    labelKey: "settings.menu.currencies",
    icon: APP_ICONS.currencies,
  },
]
