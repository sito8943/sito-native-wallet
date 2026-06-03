import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCategoryDto } from "../dtos"

import { type UseCategoriesOptions, type UseCategoriesState } from "./types"

export default function useCategories(
  options: UseCategoriesOptions = {},
): UseCategoriesState {
  const { includeSystem = true } = options
  const client = useManager().Categories
  const { items, error, isLoading } = useClientStore(client)
  const data = includeSystem
    ? items
    : items.filter((category) => category.system !== true)

  return {
    data,
    error,
    isLoading,
    addCategory: (input: AddCategoryDto) => {
      client.add(input)
    },
    addCategories: (inputs: AddCategoryDto[]) => {
      client.addMany(inputs)
    },
    updateCategory: (id: string, input: AddCategoryDto) => {
      client.update(id, input)
    },
    removeCategory: (id: string) => {
      client.remove(id)
    },
  }
}
