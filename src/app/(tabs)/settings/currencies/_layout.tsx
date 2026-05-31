import { Stack, useRouter } from "expo-router"
import { type ReactElement } from "react"

import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import { toNewCurrencyRoute } from "#shared/navigation"
import { useThemeColors } from "#shared/theme"

export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const router = useRouter()

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
          title: "Currencies",
          headerRight: () => (
            <IconButton
              accessibilityLabel="Add currency"
              icon="plus"
              size={ICON_BUTTON_SIZE.SM}
              variant={ICON_BUTTON_VARIANT.TEXT}
              onPress={() => router.push(toNewCurrencyRoute())}
            />
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: "New currency" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit currency" }} />
    </Stack>
  )
}
