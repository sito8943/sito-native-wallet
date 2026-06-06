import { type Account } from "../Account"

export type AccountSelectorProps = {
  accounts: Account[]
  selectedId: number
  onSelect: (accountId: number) => void
  allLabel?: string
}
