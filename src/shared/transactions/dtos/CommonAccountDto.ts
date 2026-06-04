// Lightweight account shape for displaying a transaction's relation. Forms send
// the accountId; reads resolve it to this common DTO from the live account.
export type CommonAccountDto = {
  id: number
  name: string
  currencySymbol: string
}
