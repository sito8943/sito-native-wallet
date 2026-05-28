import { type Account } from "../Account"

export type AccountSelectorProps = {
  accounts: Account[]
  selectedId: string | null
  onSelect: (accountId: string | null) => void
  allLabel?: string
}
