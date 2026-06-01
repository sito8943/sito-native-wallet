import { type Account } from "../Account"
import { type AddAccountDto } from "../dtos"

export type UseAccountsState = {
  data: Account[] | null
  error: Error | null
  isLoading: boolean
  addAccount: (input: AddAccountDto) => void
  updateAccount: (id: string, input: AddAccountDto) => void
  removeAccount: (id: string) => void
}
