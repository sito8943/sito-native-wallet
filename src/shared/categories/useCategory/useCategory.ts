import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddCategoryDto } from "../dtos"

import { type UseCategoryState } from "./types"

// Selects one category by id through the client's getById and binds its
// mutations. getById finds system categories too (unlike the list views, which
// hide them), so this also backs editing an auto transaction's category.
export default function useCategory(id: string): UseCategoryState {
  const client = useManager().Categories
  const { error, isLoading } = useClientStore(client)
  const category = client.getById(id) ?? null

  return {
    data: category,
    error,
    isLoading,
    update: (input: AddCategoryDto) => {
      client.update(id, input)
    },
    remove: () => {
      client.remove(id)
    },
  }
}
