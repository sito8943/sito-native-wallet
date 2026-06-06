import { type Action } from "#design/interactions"

import { type Account } from "../Account"

export type AccountCardProps = {
  account: Account
  actions?: Array<Action<Account>>
  onPress?: (account: Account) => void
}

export type AccountCardTheme = {
  accent: string
  accentSoft: string
  background: string
  border: string
  highlight: string
  mode: "flat" | "gradient"
  subtleText: string
  text: string
}
