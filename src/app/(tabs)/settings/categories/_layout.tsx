import { router, Stack } from "expo-router"
import { type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, { ICON_BUTTON_VARIANT } from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { toCategoryPrefabsRoute } from "#shared/navigation"

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
          title: "Categories",
          headerRight: () => (
            <IconButton
              accessibilityLabel="Add suggested categories"
              icon={APP_ICONS.prefabs}
              color={colors.textStrong}
              hitSlop={spacing(2)}
              onPress={() => router.push(toCategoryPrefabsRoute())}
              variant={ICON_BUTTON_VARIANT.TEXT}
            />
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: "New category" }} />
      <Stack.Screen
        name="prefabs"
        options={{ title: "Add suggested categories" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Edit category" }} />
    </Stack>
  )
}
