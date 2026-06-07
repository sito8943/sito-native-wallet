// Predefined accounts for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing accounts (by name); the
// real id is generated on insert. Balance and currency are user-specific, so
// they are not part of the template — accounts are created at balance 0 with
// the user's selected currency. name/description are inline-localized and
// resolved to a plain string (in the active language) on display and insert.
import { type LocalizedText } from "#shared/i18n"

import { type AddAccountDto } from "./dtos"

export type AccountPrefab = Omit<
  AddAccountDto,
  "balance" | "currency" | "name" | "description"
> & {
  key: string
  name: LocalizedText
  description: LocalizedText
}
