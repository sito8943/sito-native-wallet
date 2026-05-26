import { useState } from "react"

import { INITIAL_CATEGORIES } from "./constants"
import { type TransactionCategory } from "./types"

type UseCategoriesState = {
  data: TransactionCategory[] | null
  error: Error | null
  isLoading: boolean
}

export default function useCategories(): UseCategoriesState {
  const [state] = useState<UseCategoriesState>({
    data: INITIAL_CATEGORIES,
    error: null,
    isLoading: false,
  })

  return state
}
