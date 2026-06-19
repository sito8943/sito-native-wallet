import { type QueryParam, type QueryResult } from "#shared/data"

import { type FilterTransactionDto } from "../../dtos"
import { type Transaction } from "../../Transaction"

export type UseTransactionsListProps = {
  filters?: FilterTransactionDto
  query?: QueryParam<Transaction>
}

export type UseTransactionsListState = {
  result: QueryResult<Transaction>
  error: Error | null
  isLoading: boolean
}
