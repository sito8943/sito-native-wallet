import { type Href } from "expo-router"

import { type DetailRouteParams } from "./params"

export const toAccountDetailsRoute = (id: string): Href => ({
  pathname: "/accounts/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toTransactionDetailsRoute = (id: string): Href => ({
  pathname: "/transactions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})
