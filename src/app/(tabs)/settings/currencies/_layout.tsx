import { router, Stack } from "expo-router"
import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
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
            <Pressable
              accessibilityLabel="Add common currencies"
              hitSlop={spacing(2)}
              onPress={() => router.push(toCurrencyPrefabsRoute())}
            >
              <Icon
                icon={APP_ICONS.prefabs}
                color={colors.textStrong}
                size={spacing(5)}
              />
            </Pressable>
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
