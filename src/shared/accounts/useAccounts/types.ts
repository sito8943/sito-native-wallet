import { type Account } from "../Account"

export type UseAccountsState = {
  data: Account[] | null
  error: Error | null
  isLoading: boolean
}
