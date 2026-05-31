import { type Dispatch, type SetStateAction } from "react"

import {
  type RESOLVED_THEME,
  type THEME_COLOR,
  type THEME_PREFERENCE,
} from "./constants"

export type ThemePreference =
  (typeof THEME_PREFERENCE)[keyof typeof THEME_PREFERENCE]

export type ResolvedTheme = (typeof RESOLVED_THEME)[keyof typeof RESOLVED_THEME]

export type ThemeColorName = (typeof THEME_COLOR)[keyof typeof THEME_COLOR]

export type ThemeColors = Record<ThemeColorName, string>

export type ThemeContextValue = {
  colors: ThemeColors
  isLoading: boolean
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: Dispatch<SetStateAction<ThemePreference>>
  togglePreference: () => void
}

export type UseThemePreferenceResult = {
  isLoading: boolean
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: ThemeContextValue["setPreference"]
  togglePreference: () => void
}
