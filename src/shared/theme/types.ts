import { type Dispatch, type SetStateAction } from "react"

export type ThemePreference = "light" | "dark"

export type ThemeColors = {
  background: string
  surface: string
  border: string
  textStrong: string
  textMuted: string
  textSubtle: string
  textInverted: string
  positive: string
  negative: string
  primary: string
}

export type ThemeContextValue = {
  colors: ThemeColors
  isLoading: boolean
  preference: ThemePreference
  setPreference: Dispatch<SetStateAction<ThemePreference>>
  togglePreference: () => void
}
