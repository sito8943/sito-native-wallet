import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { Tabs } from "expo-router"
import { type ReactElement } from "react"

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
            <FontAwesome5 name="home" color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="file-invoice-dollar"
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
            <FontAwesome5 name="wallet" color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" color={color} size={spacing.lg} />
          ),
        }}
      />
    </Tabs>
  )
}
