export const ACCOUNT_TYPE = {
  CASH: "cash",
  DIGITAL: "digital",
} as const

export const ACCOUNT_BANK_NAME = {
  IMAGIN: "Imagin",
  CAIXA: "Caixa",
  REVOLUT: "Revolut",
  BANDEC: "Bandec",
  BPA: "BPA",
  BANCO_METROPOLITANO: "Banco Metropolitano",
} as const

export const ACCOUNT_BANK_OPTIONS = Object.values(ACCOUNT_BANK_NAME).map(
  (bankName, index) => ({
    id: index + 1,
    label: bankName,
  }),
)

// Human-readable labels for selectors and cards.
export const ACCOUNT_TYPE_LABEL = {
  [ACCOUNT_TYPE.CASH]: "Cash",
  [ACCOUNT_TYPE.DIGITAL]: "Digital",
} as const

// Maps each local type to the backend AccountType enum ordinal (PHYSICAL=0,
// VIRTUAL=1) used on the wire — cash ↔ physical, digital ↔ virtual (card).
export const ACCOUNT_TYPE_CODE = {
  [ACCOUNT_TYPE.CASH]: 0,
  [ACCOUNT_TYPE.DIGITAL]: 1,
} as const
