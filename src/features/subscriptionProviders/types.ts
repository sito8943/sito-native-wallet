// Predefined providers for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing providers (by name); the
// real id is generated on insert.
import { type AddSubscriptionProviderDto } from "./dtos"

export type SubscriptionProviderPrefab = AddSubscriptionProviderDto & {
  key: string
}
