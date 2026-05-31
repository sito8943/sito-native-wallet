import { useManager } from "#shared/manager"
import { useClientStore } from "#shared/storage"

import { type AddCategoryDto } from "../dtos"

import { type UseCategoriesState } from "./types"

export default function useCategories(): UseCategoriesState {
  const client = useManager().Categories
  const { items, error, isLoading } = useClientStore(client)

  return {
    data: items,
    error,
    isLoading,
    addCategory: (input: AddCategoryDto) => {
      client.add(input)
    },
    updateCategory: (id: string, input: AddCategoryDto) => {
      client.update(id, input)
    },
    removeCategory: (id: string) => {
      client.remove(id)
    },
  }
}
