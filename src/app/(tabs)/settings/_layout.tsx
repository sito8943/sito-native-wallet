import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { colors } from "#design/foundations"

export default function Layout(): ReactElement {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textStrong,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="categories" options={{ title: "Categories" }} />
      <Stack.Screen name="currencies" options={{ title: "Currencies" }} />
    </Stack>
  )
}
