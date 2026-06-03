import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#design/theme"

export default function Layout(): ReactElement {
  const colors = useThemeColors()

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textStrong,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Subscription providers" }}
      />
      <Stack.Screen name="new" options={{ title: "New provider" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit provider" }} />
    </Stack>
  )
}
