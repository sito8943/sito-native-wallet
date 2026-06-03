import * as NavigationBar from "expo-navigation-bar"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, type ReactElement } from "react"
import { Platform } from "react-native"

import {
  RESOLVED_THEME,
  ThemeProvider,
  useThemePreference,
} from "#design/theme"
import {
  INITIAL_SUBSCRIPTIONS,
  notifyUpcomingRenewal,
} from "#shared/subscriptions"

function RootNavigator(): ReactElement {
  const { resolvedTheme } = useThemePreference()
  const isDark = resolvedTheme === RESOLVED_THEME.DARK

  // Android nav bar icons don't follow the app theme on their own. With
  // edge-to-edge only the button style is settable (background is a no-op).
  useEffect(() => {
    if (Platform.OS !== "android") {
      return
    }

    void NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark")
  }, [isDark])

  useEffect(() => {
    void notifyUpcomingRenewal(INITIAL_SUBSCRIPTIONS)
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style={isDark ? "light" : "dark"} />
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
