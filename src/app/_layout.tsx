import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"

export default function Layout(): ReactElement {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  )
}
