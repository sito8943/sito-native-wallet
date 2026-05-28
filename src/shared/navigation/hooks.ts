import { useLocalSearchParams } from "expo-router"

import { type DetailRouteParams } from "./params"

export const useDetailRouteParams = (): DetailRouteParams =>
  useLocalSearchParams<DetailRouteParams>()
