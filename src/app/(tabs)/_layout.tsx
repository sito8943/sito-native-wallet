import { Tabs } from "expo-router"
import { type ReactElement } from "react"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

export default function Layout(): ReactElement {
  const colors = useThemeColors()

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
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon icon={APP_ICONS.home} color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.transactions}
              color={color}
              size={spacing.lg}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon icon={APP_ICONS.accounts} color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon icon={APP_ICONS.settings} color={color} size={spacing.lg} />
          ),
        }}
      />
    </Tabs>
  )
}
