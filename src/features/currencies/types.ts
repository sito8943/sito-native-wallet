// Predefined currencies for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing currencies (by symbol);
// the real id is generated on insert. name/description are inline-localized and
// resolved to a plain string (in the active language) on display and insert.
import { type LocalizedText } from "#shared/i18n"

import { type AddCurrencyDto } from "./dtos"

export type CurrencyPrefab = Omit<AddCurrencyDto, "name" | "description"> & {
  key: string
  name: LocalizedText
  description: LocalizedText
}
