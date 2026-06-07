import { router, Stack } from "expo-router"
import { type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"
import { toAccountPrefabsRoute } from "#shared/navigation"

export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const { t } = useI18n()

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
          title: t("accounts.title"),
          headerRight: () => (
            <IconButton
              accessibilityLabel={t("accounts.addSuggested")}
              icon={APP_ICONS.prefabs}
              iconColor={colors.textStrong}
              hitSlop={spacing(2)}
              onPress={() => router.push(toAccountPrefabsRoute())}
              variant={ICON_BUTTON_VARIANT.TEXT}
              size={ICON_BUTTON_SIZE.LG}
            />
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: t("accounts.new.title") }} />
      <Stack.Screen
        name="prefabs"
        options={{ title: t("accounts.prefabs.title") }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: t("accounts.details.title") }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ title: t("accounts.edit.title") }}
      />
      <Stack.Screen
        name="transactions/[id]"
        options={{ title: t("accounts.transaction.title") }}
      />
    </Stack>
  )
}
