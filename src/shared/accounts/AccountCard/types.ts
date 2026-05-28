import { type Account } from "../Account"

export type AccountCardPropsType = {
  account: Account
  onPress?: (account: Account) => void
}
