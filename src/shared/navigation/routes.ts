import { type Href } from "expo-router"

import { type DetailRouteParams } from "./params"

export const toAccountDetailsRoute = (id: string): Href => ({
  pathname: "/settings/accounts/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toTransactionDetailsRoute = (id: string): Href => ({
  pathname: "/transactions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toSubscriptionDetailsRoute = (id: string): Href => ({
  pathname: "/subscriptions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewCurrencyRoute = (): Href => "/settings/currencies/new"

export const toCurrencyDetailsRoute = (id: string): Href => ({
  pathname: "/settings/currencies/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewCategoryRoute = (): Href => "/settings/categories/new"

export const toCategoryDetailsRoute = (id: string): Href => ({
  pathname: "/settings/categories/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toNewSubscriptionProviderRoute = (): Href =>
  "/settings/subscription-providers/new"

export const toSubscriptionProviderDetailsRoute = (id: string): Href => ({
  pathname: "/settings/subscription-providers/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})
