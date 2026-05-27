
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
        name="currencies"
        options={{
          title: "Currencies",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="coins" color={color} size={spacing.lg} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={spacing.lg} name="wallet" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={spacing.lg} name="tags" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={20} name="file-invoice-dollar" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
