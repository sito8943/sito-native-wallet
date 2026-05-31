import * as NavigationBar from "expo-navigation-bar"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement, useEffect } from "react"
import { Platform } from "react-native"

import {
  RESOLVED_THEME,
  ThemeProvider,
  useThemePreference,
} from "#shared/theme"

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
