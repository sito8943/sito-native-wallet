import { ACCOUNT_TYPE_LABEL } from "./constants"
import { type Account } from "./types"

// Card/header subtitle: "Type · Currency · Symbol", e.g. "Digital · US Dollar · $".
export const accountMeta = (account: Account): string =>
  [
    ACCOUNT_TYPE_LABEL[account.type],
    account.currency.name,
    account.currency.symbol,
  ].join(" · ")
