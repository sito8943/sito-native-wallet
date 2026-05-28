import { useState } from "react"

import { INITIAL_CATEGORIES } from "../demoData"

import { type UseCategoriesState } from "./types"

export default function useCategories(): UseCategoriesState {
  const [state] = useState<UseCategoriesState>({
    data: INITIAL_CATEGORIES,
    error: null,
    isLoading: false,
  })

  return state
}
