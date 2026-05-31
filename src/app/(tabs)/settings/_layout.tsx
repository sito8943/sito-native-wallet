import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#shared/theme"

export default function Layout(): ReactElement {
  const colors = useThemeColors()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textStrong,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen name="currencies" options={{ headerShown: false }} />
      <Stack.Screen name="accounts" options={{ headerShown: false }} />
      <Stack.Screen
        name="subscription-providers"
        options={{ title: "Subscription Providers" }}
      />
    </Stack>
  )
}
