import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

// Anchor deep pushes/links (e.g. home → /settings/accounts) on the section
// root so a back button always exists and tab re-press resets to it.
export const unstable_settings = {
  initialRouteName: "index",
}

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
      <Stack.Screen name="index" options={{ title: t("settings.title") }} />
      <Stack.Screen
        name="profile"
        options={{ title: t("settings.profile.title") }}
      />
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen name="currencies" options={{ headerShown: false }} />
      <Stack.Screen name="accounts" options={{ headerShown: false }} />
      <Stack.Screen
        name="subscription-providers"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
