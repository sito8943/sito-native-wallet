import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins"
import { NavigationBar } from "expo-navigation-bar"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
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
import { OfflineBanner } from "#shared/network"

// Hold the native splash until our fonts are ready so the brand wordmark never
// flashes a fallback. Only Poppins (the wordmark) is custom; everything else
// uses the system font.
void SplashScreen.preventAutoHideAsync()

function RootNavigator(): ReactElement {
  const { resolvedTheme } = useThemePreference()
  const isDark = resolvedTheme === RESOLVED_THEME.DARK

  // Android nav bar icons don't follow the app theme on their own. With
  // edge-to-edge only the button style is settable (background is a no-op).
  useEffect(() => {
    if (Platform.OS !== "android") {
      return
    }

    NavigationBar.setStyle(isDark ? "light" : "dark")
  }, [isDark])

  return (
    <>
      <OfflineBanner />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Shared detail screens (above the tabs); (details) owns its header. */}
        <Stack.Screen name="(details)" options={{ headerShown: false }} />
        {/* Optional auth screens (above the tabs); (auth) owns its header. */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  )
}

export default function Layout(): ReactElement | null {
  const [fontsLoaded] = useFonts({ Poppins_700Bold })

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

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
