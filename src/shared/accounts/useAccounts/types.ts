import { type QueryParam, type QueryResult } from "#shared/data"

import { type Account } from "../Account"
import { type AddAccountDto, type FilterAccountDto } from "../dtos"

export type UseAccountsOptions = {
  filters?: FilterAccountDto
  query?: QueryParam<Account>
}

export type UseAccountsState = {
  data: Account[] | null
  result: QueryResult<Account>
  error: Error | null
  isLoading: boolean
  addAccount: (input: AddAccountDto) => void
  updateAccount: (id: string, input: AddAccountDto) => void
  removeAccount: (id: string) => void
}
