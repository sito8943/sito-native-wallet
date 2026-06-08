import { type ReactElement } from "react"

import AccountVisual from "./AccountVisual"
import { type AccountCardProps } from "./types"

// The account list/detail card. Presentation lives in the shared AccountVisual
// (also used by the dashboard's CurrentBalanceCard); this just forwards props.
export default function AccountCard(props: AccountCardProps): ReactElement {
  return <AccountVisual {...props} />
}
