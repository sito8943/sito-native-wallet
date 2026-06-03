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
        options={{
          title: "Accounts",
        }}
      />
      <Stack.Screen name="new" options={{ title: "New account" }} />
      <Stack.Screen name="[id]" options={{ title: "Account details" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit account" }} />
    </Stack>
  )
}
