import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

// Auth screens live in the root stack (above the tabs) so they open from
// Settings with a native back button and the tab bar hidden. Auth is optional:
// the app is fully usable as a guest without ever entering this group.
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
        name="sign-in"
        options={{ title: t("auth.signIn.title") }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: t("auth.signUp.title") }}
      />
      <Stack.Screen
        name="sign-up-confirmation"
        options={{ title: t("auth.confirm.headerTitle") }}
      />
    </Stack>
  )
}
