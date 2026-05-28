import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"

import {
  RESOLVED_THEME,
  ThemeProvider,
  useThemePreference,
} from "#shared/theme"

function RootNavigator(): ReactElement {
  const { resolvedTheme } = useThemePreference()

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
