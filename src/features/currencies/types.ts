// Predefined currencies for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing currencies (by symbol);

import { type AddCurrencyDto } from "./dtos"

// the real id is generated on insert.
export type CurrencyPrefab = AddCurrencyDto & { key: string }
