// Predefined categories for the quick-add picker. `key` is a stable id used for
// selection state and de-duplication against existing categories (by name);

import { type AddCategoryDto } from "./dtos"

// the real id is generated on insert.
export type CategoryPrefab = AddCategoryDto & { key: string }
