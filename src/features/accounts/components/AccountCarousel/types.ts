import { type ReactNode } from "react"

import { type Account } from "../../Account"

export type AccountCarouselProps = {
  accounts: Account[]
  // The account whose page is shown; drives the active dot.
  selectedId: number
  // Swiping to a page selects that account.
  onSelect: (accountId: number) => void
  // Tapping a card (e.g. open the account detail).
  onPressAccount: (account: Account) => void
  // Optional node shown to the right of the dots row (e.g. a filter button).
  action?: ReactNode
}
