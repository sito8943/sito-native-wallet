import { useLocalSearchParams } from "expo-router"

import { type DetailRouteParams } from "./params"

export const useDetailRouteParams = (): DetailRouteParams => {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>()
  const rawId = Array.isArray(id) ? id[0] : id
  const numericId = rawId === undefined ? 0 : Number(rawId)

  return {
    id: Number.isFinite(numericId) ? numericId : 0,
  }
}
