import { type AddCategoryDto } from "../../dtos"
import { TRANSACTION_TYPE } from "../../TransactionCategory"

// Preset category colors (entity colors, not theme colors). First is default.
export const CATEGORY_PALETTE = [
  "#2e7d32",
  "#ef6c00",
  "#1565c0",
  "#6a1b9a",
  "#c62828",
  "#00838f",
  "#5d4037",
  "#ad1457",
] as const

export const EMPTY_CATEGORY: AddCategoryDto = {
  name: "",
  description: "",
  color: CATEGORY_PALETTE[0],
  type: TRANSACTION_TYPE.EXPENSE,
}

export const CATEGORY_FIELD_LIMITS = {
  NAME: 30,
  DESCRIPTION: 120,
} as const

// Accepts #rgb or #rrggbb (case-insensitive).
export const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
