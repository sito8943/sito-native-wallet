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
      <Stack.Screen name="index" options={{ title: "Categories" }} />
      <Stack.Screen name="new" options={{ title: "New category" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit category" }} />
    </Stack>
  )
}
