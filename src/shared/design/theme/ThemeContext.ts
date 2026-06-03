import { createContext } from "react"

import { lightColors } from "../foundations/colors"

import { RESOLVED_THEME, THEME_PREFERENCE } from "./constants"
import { type ThemeContextValue, type ThemePreference } from "./types"

const defaultTogglePreference = (): void => undefined

const defaultSetPreference = (
  _value: ThemePreference | ((current: ThemePreference) => ThemePreference),
): void => undefined

export const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  isLoading: false,
  preference: THEME_PREFERENCE.SYSTEM,
  resolvedTheme: RESOLVED_THEME.LIGHT,
  setPreference: defaultSetPreference,
  togglePreference: defaultTogglePreference,
})
