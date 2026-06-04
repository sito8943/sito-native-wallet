import { type CommonAccountDto } from "../dtos"

// Relation snapshot used when an account was deleted but transactions remain.
export const MISSING_ACCOUNT: CommonAccountDto = {
  id: 0,
  name: "Unknown account",
  currencySymbol: "",
}
