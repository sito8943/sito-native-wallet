import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, type ReactElement } from "react"

import {
  INITIAL_SUBSCRIPTIONS,
  notifyUpcomingRenewal,
} from "#shared/subscriptions"
import {
  RESOLVED_THEME,
  ThemeProvider,
  useThemePreference,
} from "#shared/theme"

function RootNavigator(): ReactElement {
  const { resolvedTheme } = useThemePreference()

  useEffect(() => {
    void notifyUpcomingRenewal(INITIAL_SUBSCRIPTIONS)
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style={resolvedTheme === RESOLVED_THEME.DARK ? "light" : "dark"}
      />
    </>
  )
}

export default function Layout(): ReactElement {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  )
}
