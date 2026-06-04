import { router, Stack } from "expo-router"
import { type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { toCurrencyPrefabsRoute } from "#shared/navigation"

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
          title: "Currencies",
          headerRight: () => (
            <IconButton
              accessibilityLabel="Add common currencies"
              icon={APP_ICONS.prefabs}
              color={colors.textStrong}
              hitSlop={spacing(2)}
              onPress={() => router.push(toCurrencyPrefabsRoute())}
              variant={ICON_BUTTON_VARIANT.TEXT}
              size={ICON_BUTTON_SIZE.LG}
            />
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: "New currency" }} />
      <Stack.Screen
        name="prefabs"
        options={{ title: "Add common currencies" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Edit currency" }} />
    </Stack>
  )
}
