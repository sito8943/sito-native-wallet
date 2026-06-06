import * as NavigationBar from "expo-navigation-bar"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, type ReactElement } from "react"
import { Platform, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import {
  RESOLVED_THEME,
  ThemeProvider,
  useThemePreference,
} from "#design/theme"
import { LanguageProvider } from "#shared/i18n"
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

    const applyNavigationBarStyle = async (): Promise<void> => {
      if (typeof NavigationBar.setStyle === "function") {
        await NavigationBar.setStyle(isDark ? "light" : "dark")
        return
      }

      if (typeof NavigationBar.setButtonStyleAsync === "function") {
        await NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark")
      }
    }

    void applyNavigationBarStyle()
  }, [isDark])

  useEffect(() => {
    void notifyUpcomingRenewal(INITIAL_SUBSCRIPTIONS)
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  )
}

export default function Layout(): ReactElement {
  return (
    // Root wrapper required by react-native-gesture-handler.
    <GestureHandlerRootView style={styles.root}>
      <LanguageProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
