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
          title: t("accounts.title"),
        }}
      />
      <Stack.Screen name="new" options={{ title: t("accounts.new.title") }} />
      <Stack.Screen
        name="[id]"
        options={{ title: t("accounts.details.title") }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ title: t("accounts.edit.title") }}
      />
      <Stack.Screen
        name="transactions/[id]"
        options={{ title: t("accounts.transaction.title") }}
      />
    </Stack>
  )
}
