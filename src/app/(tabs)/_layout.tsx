import { Tabs } from "expo-router"
import { type ReactElement } from "react"

export default function Layout(): ReactElement {
  return (
    <Tabs>
      <Tabs.Screen
        name="transactions"
        options={{ title: "Transactions", headerShown: false }}
      />
      <Tabs.Screen name="categories" options={{ title: "Categories" }} />
      <Tabs.Screen name="currencies" options={{ title: "Currencies" }} />
    </Tabs>
  )
}
