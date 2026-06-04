import { Tabs } from "expo-router"
import { type ReactElement } from "react"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const { t } = useI18n()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("nav.home"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon icon={APP_ICONS.home} color={color} size={spacing(5)} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t("nav.transactions"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.transactions}
              color={color}
              size={spacing(5)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: t("nav.subscriptions"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.subscriptions}
              color={color}
              size={spacing(5)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("nav.settings"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon icon={APP_ICONS.settings} color={color} size={spacing(5)} />
          ),
        }}
      />
    </Tabs>
  )
}
