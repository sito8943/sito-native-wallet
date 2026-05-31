import { HEX_COLOR_PATTERN } from "./constants"

export const normalizeHexColor = (value: string): string => {
  const trimmed = value.trim()
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`
}

export const isValidHexColor = (value: string): boolean =>
  HEX_COLOR_PATTERN.test(value.trim())
