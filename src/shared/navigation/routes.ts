import { type Href } from "expo-router"

import { type DetailRouteParams } from "./params"

// Detail screens live in the root (details) group so they open from any tab
// with a back button that returns to the origin (the group has no URL segment).
export const toAccountDetailsRoute = (id: number): Href => ({
  pathname: "/account/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toAccountsRoute = (): Href => "/settings/accounts"

export const toNewAccountRoute = (): Href => "/settings/accounts/new"

export const toAccountPrefabsRoute = (): Href => "/settings/accounts/prefabs"

export const toEditAccountRoute = (id: number): Href => ({
  pathname: "/account/edit/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

// Optional accountId pre-selects the owning account (e.g. from an account's
// detail screen). Lives in the (details) group → back returns to the origin.
export const toNewTransactionRoute = (accountId?: number): Href =>
  accountId === undefined
    ? "/transaction/new"
    : { pathname: "/transaction/new", params: { accountId } }

export const toTransactionDetailsRoute = (id: number): Href => ({
  pathname: "/transaction/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toSubscriptionDetailsRoute = (id: number): Href => ({
  pathname: "/subscriptions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toCurrenciesRoute = (): Href => "/settings/currencies"

export const toNewCurrencyRoute = (): Href => "/settings/currencies/new"

export const toCurrencyPrefabsRoute = (): Href => "/settings/currencies/prefabs"

export const toCurrencyDetailsRoute = (id: number): Href => ({
  pathname: "/settings/currencies/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toCategoriesRoute = (): Href => "/settings/categories"

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
