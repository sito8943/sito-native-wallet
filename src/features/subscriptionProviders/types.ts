// Predefined providers for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing providers (by name); the
// real id is generated on insert. The provider name is a proper noun (kept
// as-is); only the description is inline-localized and resolved to a plain
// string (in the active language) on display and insert.
import { type LocalizedText } from "#shared/i18n"

import { type AddSubscriptionProviderDto } from "./dtos"

export type SubscriptionProviderPrefab = Omit<
  AddSubscriptionProviderDto,
  "description"
> & {
  key: string
  description: LocalizedText
}
