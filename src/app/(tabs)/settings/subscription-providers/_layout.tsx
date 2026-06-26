import { Stack } from "expo-router"
import { type ReactElement } from "react"

import HeaderBackButton from "#design/patterns/HeaderBackButton"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"
import { toSettingsRoute } from "#shared/navigation"

// Anchor deep pushes/links on index so prefabs/new always have a back button.
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
      <Stack.Screen
        name="index"
        options={{
          title: t("subscriptionProviders.title"),
          headerLeft: () => <HeaderBackButton fallback={toSettingsRoute()} />,
        }}
      />
      <Stack.Screen
        name="new"
        options={{ title: t("subscriptionProviders.new.title") }}
      />
      <Stack.Screen
        name="prefabs"
        options={{ title: t("subscriptionProviders.prefabs.title") }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: t("subscriptionProviders.edit.title") }}
      />
    </Stack>
  )
}
