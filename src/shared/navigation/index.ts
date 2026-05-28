type DetailRouteParams = {
  id: string
}

export const toAccountDetailsRoute = (id: string) => ({
  pathname: "/accounts/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})

export const toTransactionDetailsRoute = (id: string) => ({
  pathname: "/transactions/[id]" as const,
  params: { id } satisfies DetailRouteParams,
})
