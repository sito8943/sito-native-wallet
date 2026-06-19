import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCategoryDto } from "../../dtos"

import { type UseCategoriesOptions, type UseCategoriesState } from "./types"

export default function useCategories(
  options: UseCategoriesOptions = {},
): UseCategoriesState {
  const { includeSystem = true, filters, query } = options
  const client = useManager().Categories
  const { error, isLoading } = useClientStore(client)

  // The client owns filter matching (incl. the includeSystem rule); pageSize 0
  // keeps the full list unless a query opts into pagination.
  const result = client.list({ pageSize: 0, ...query }, filters, includeSystem)

  return {
    data: result.items,
    result,
    error,
    isLoading,
    addCategory: (input: AddCategoryDto) => {
      client.add(input)
    },
    addCategories: (inputs: AddCategoryDto[]) => {
      client.addMany(inputs)
    },
    updateCategory: (id: number, input: AddCategoryDto) => {
      client.update(id, input)
    },
    removeCategory: (id: number) => {
      client.remove(id)
    },
  }
}
