import { ACCOUNT_TYPE, ACCOUNT_TYPE_CODE, ACCOUNT_TYPE_LABEL } from "./constants"
import { type Account, type AccountType } from "./types"

// Card/header subtitle: "Type · Currency · Symbol", e.g. "Digital · US Dollar · $".
export const accountMeta = (account: Account): string =>
  [
    ACCOUNT_TYPE_LABEL[account.type],
    account.currency.name,
    account.currency.symbol,
  ].join(" · ")

// Local type → backend ordinal (for push).
export const accountTypeToCode = (type: AccountType): number =>
  ACCOUNT_TYPE_CODE[type]

// Backend ordinal → local type (for pull); anything but 1 (virtual) is cash.
export const accountTypeFromCode = (code: number): AccountType =>
  code === ACCOUNT_TYPE_CODE[ACCOUNT_TYPE.DIGITAL]
    ? ACCOUNT_TYPE.DIGITAL
    : ACCOUNT_TYPE.CASH
