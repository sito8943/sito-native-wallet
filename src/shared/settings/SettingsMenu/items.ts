import { APP_ICONS } from "#design/elements/Icon"

import { type SettingsMenuItem } from "./types"

export const settingsMenuItems: SettingsMenuItem[] = [
  { href: "/settings/profile", label: "Profile", icon: APP_ICONS.profile },
  {
    href: "/settings/accounts",
    label: "Accounts",
    icon: APP_ICONS.accounts,
  },
  {
    href: "/settings/subscription-providers",
    label: "Subscription Providers",
    icon: APP_ICONS.subscriptionProviders,
  },
  {
    href: "/settings/categories",
    label: "Categories",
    icon: APP_ICONS.categories,
  },
  {
    href: "/settings/currencies",
    label: "Currencies",
    icon: APP_ICONS.currencies,
  },
]
