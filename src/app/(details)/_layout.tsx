import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

// Shared detail screens hosted in the root stack (above the tabs) so they open
// from ANY tab with a back button that returns to the exact origin. Same themed
// header as the in-tab stacks, so the top bar looks identical; only difference
// is the tab bar is hidden while drilled into a detail (standard drill-in).
export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const { t } = useI18n()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textStrong,
      }}
    >
      <Stack.Screen
        name="account/[id]"
        options={{ title: t("accounts.details.title") }}
      />
      <Stack.Screen
        name="account/edit/[id]"
        options={{ title: t("accounts.edit.title") }}
      />
      <Stack.Screen
        name="transaction/new"
        options={{ title: t("transactions.new.title") }}
      />
      <Stack.Screen
        name="transaction/[id]"
        options={{ title: t("transactions.edit.title") }}
      />
    </Stack>
  )
}
