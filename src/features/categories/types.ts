// Predefined categories for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing categories (by name); the
// real id is generated on insert. name/description are inline-localized and
// resolved to a plain string (in the active language) on display and insert.
import { type LocalizedText } from "#shared/i18n"

import { type AddCategoryDto } from "./dtos"

export type CategoryPrefab = Omit<AddCategoryDto, "name" | "description"> & {
  key: string
  name: LocalizedText
  description: LocalizedText
}
