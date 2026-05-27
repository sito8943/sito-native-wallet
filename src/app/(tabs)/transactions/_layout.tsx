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
      <Stack.Screen
        name="index"
        options={{
          title: "Transactions",
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Transaction details" }} />
    </Stack>
  )
}
