import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { Tabs } from "expo-router"
import { type ReactElement } from "react"

import { colors, spacing } from "#design/foundations"

export default function Layout(): ReactElement {
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen name="categories" options={{ href: null }} />
      <Tabs.Screen name="currencies" options={{ href: null }} />
    </Tabs>
  )
}
