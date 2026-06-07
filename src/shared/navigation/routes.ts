import { type Href } from "expo-router"

import { type DetailRouteParams } from "./params"

export const toAccountDetailsRoute = (id: number): Href => ({
  pathname: "/settings/accounts/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewAccountRoute = (): Href => "/settings/accounts/new"

export const toAccountPrefabsRoute = (): Href => "/settings/accounts/prefabs"

export const toEditAccountRoute = (id: number): Href => ({
  pathname: "/settings/accounts/edit/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewTransactionRoute = (): Href => "/transactions/new"

export const toTransactionDetailsRoute = (id: number): Href => ({
  pathname: "/transactions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

// Transaction detail inside the accounts stack — keeps the back button within
// the settings/accounts navigator instead of jumping to the transactions tab.
export const toAccountTransactionDetailsRoute = (id: number): Href => ({
  pathname: "/settings/accounts/transactions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toSubscriptionDetailsRoute = (id: number): Href => ({
  pathname: "/subscriptions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewCurrencyRoute = (): Href => "/settings/currencies/new"

export const toCurrencyPrefabsRoute = (): Href => "/settings/currencies/prefabs"

export const toCurrencyDetailsRoute = (id: number): Href => ({
  pathname: "/settings/currencies/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewCategoryRoute = (): Href => "/settings/categories/new"

export const toCategoryPrefabsRoute = (): Href => "/settings/categories/prefabs"

export const toCategoryDetailsRoute = (id: number): Href => ({
  pathname: "/settings/categories/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewSubscriptionProviderRoute = (): Href =>
  "/settings/subscription-providers/new"

export const toSubscriptionProviderPrefabsRoute = (): Href =>
  "/settings/subscription-providers/prefabs"

export const toSubscriptionProviderDetailsRoute = (id: number): Href => ({
  pathname: "/settings/subscription-providers/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})
