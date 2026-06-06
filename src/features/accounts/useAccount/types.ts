import { type Account } from "../Account"
import { type AddAccountDto } from "../dtos"

export type UseAccountState = {
  // The matching account, or null once loaded if the id isn't found.
  data: Account | null
  error: Error | null
  isLoading: boolean
  // Mutations bound to this id — the view doesn't re-thread it.
  update: (input: AddAccountDto) => void
  remove: () => void
}
