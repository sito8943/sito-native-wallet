import { type ColorSchemeName } from "react-native"

import { darkColors, lightColors } from "../design/foundations/colors"

import { PREFERENCE_CYCLE, RESOLVED_THEME, THEME_PREFERENCE } from "./constants"
import {
  type ResolvedTheme,
  type ThemeColors,
  type ThemePreference,
} from "./types"

export const parseThemePreference = (value: unknown): ThemePreference => {
  if (value === THEME_PREFERENCE.DARK) {
    return THEME_PREFERENCE.DARK
  }

  if (value === THEME_PREFERENCE.LIGHT) {
    return THEME_PREFERENCE.LIGHT
  }

  return THEME_PREFERENCE.SYSTEM
}

export const resolveTheme = (
  preference: ThemePreference,
  systemScheme: ColorSchemeName,
): ResolvedTheme => {
  if (preference === THEME_PREFERENCE.SYSTEM) {
    return systemScheme === RESOLVED_THEME.DARK
      ? RESOLVED_THEME.DARK
      : RESOLVED_THEME.LIGHT
  }

  return preference
}

export const getThemeColors = (theme: ResolvedTheme): ThemeColors =>
  theme === RESOLVED_THEME.DARK ? darkColors : lightColors

export const nextPreference = (preference: ThemePreference): ThemePreference =>
  PREFERENCE_CYCLE[preference]
