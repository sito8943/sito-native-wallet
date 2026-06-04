import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

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
          title: t("transactions.title"),
        }}
      />
      <Stack.Screen name="new" options={{ title: t("transactions.new.title") }} />
      <Stack.Screen
        name="[id]"
        options={{ title: t("transactions.edit.title") }}
      />
    </Stack>
  )
}
