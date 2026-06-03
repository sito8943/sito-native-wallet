import { StyleSheet } from "react-native"

import { type ThemeColors } from "./types"
import { useThemeColors } from "./useThemePreference"

type StylesFactory<T> = (colors: ThemeColors) => T

const cache = new WeakMap<
  ThemeColors,
  WeakMap<StylesFactory<unknown>, unknown>
>()

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  factory: StylesFactory<T>,
): T => {
  const colors = useThemeColors()

  let byFactory = cache.get(colors)
  if (!byFactory) {
    byFactory = new WeakMap()
    cache.set(colors, byFactory)
  }

  const cached = byFactory.get(factory) as T | undefined
  if (cached) {
    return cached
  }

  const created = StyleSheet.create(factory(colors))
  byFactory.set(factory, created)
  return created
}
