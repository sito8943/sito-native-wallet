import { type QueryParam } from "#shared/data"

import { type FilterTransactionDto } from "../dtos"
import { type Transaction } from "../Transaction"

export type UseInfiniteTransactionsProps = {
  filters?: FilterTransactionDto
  // currentPage is owned by the hook; callers set sort + pageSize only.
  query?: Omit<QueryParam<Transaction>, "currentPage">
}

export type UseInfiniteTransactionsState = {
  items: Transaction[]
  total: number
  hasNextPage: boolean
  fetchNextPage: () => void
  error: Error | null
  isLoading: boolean
}
