import { type Account } from "../Account"

export type AccountCardProps = {
  account: Account
  onPress?: (account: Account) => void
}
